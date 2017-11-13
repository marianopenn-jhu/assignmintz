# backend/resources.py

from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from backend.models import User, Assignment, SubTask, Course, OfficeHours
from tastypie.authorization import Authorization
from tastypie import fields, bundle
from backend.validation import UserValidation
from django.db import IntegrityError
#from django.contrib.auth.models import User


class UserResource(ModelResource):
    class Meta:
            queryset = User.objects.all()
            resource_name = 'user'
            authorization = Authorization()
            allowed_methods = ['get', 'post']
            validation = UserValidation()

class AssignmentResource(ModelResource):
    class Meta:
        queryset = Assignment.objects.all()
        resource_name = 'professor/assignment'
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'delete']
        excludes = ['assignment_id', 'due_date', 'actual_difficulty', 'actual_time', 'priority', 'percent_complete', 'visible', 'description']

    def dehydrate(self, bundle):
        bundle.data["professor"]=bundle.obj.professor.user_name
        return bundle

class SubTaskResource(ModelResource):
    class Meta:
            queryset = SubTask.objects.all()
            resource_name = 'subtask'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            excludes = ['description']

class CourseResource(ModelResource):
    professor = fields.ForeignKey(UserResource, 'professor')
    #students = fields.ManyToManyField(UserResource, 'students')
    student = fields.ForeignKey(UserResource, 'student')
    class Meta:
        queryset = Course.objects.all()
        resource_name = 'course'
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'delete', 'put']
        excludes = []

    # def save_m2m(self, bundle):
    #     print('field items:'+str(self.fields.items()))
    #     for field_name, field_object in self.fields.items():
    #
    #         if not getattr(field_object, 'is_m2m', False):
    #             continue
    #
    #         if not field_object.attribute:
    #             continue
    #
    #         for field in bundle.data[field_name]:
    #             kwargs = {'course_id': Course.objects.get(pk=bundle.obj.course_id),
    #                       'user_id': field.obj}
    #
    #             try: CourseStudents.objects.get_or_create(**kwargs)
    #             except IntegrityError: continue


    # def obj_update(self, bundle, request, **kwargs):
    #     print('updating obj')

    def dehydrate(self, bundle):
        bundle.data["professor"]=bundle.obj.professor.user_name
        bundle.data["student"]=bundle.obj.student.user_name
        return bundle

# class StudentCourseResource(ModelResource):
#     students = fields.ManyToManyField(UserResource, 'students')
#
#     class Meta:
#         queryset = Course.objects.all()
#         resource_name = 'student/course'
#         authorization = Authorization()
#         allowed_methods = ['get', 'post']
#         excludes = ['assignments', 'description', 'professor', 'course_title', 'visible']
#
#     def dehydrate(self, bundle):
#         bundle.data["students"]=bundle.obj.students[user_name]
#         return bundle


class OfficeHoursResource(ModelResource):
    class Meta:
            queryset = OfficeHours.objects.all()
            resource_name = 'officehours'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
