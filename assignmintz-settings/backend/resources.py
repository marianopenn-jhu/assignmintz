# backend/resources.py

from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from backend.models import User, Assignment, SubTask, Course, OfficeHours, LogIn
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie import fields, bundle
from backend.validation import UserValidation
from django.db import IntegrityError
#from django.contrib.auth.models import User

class LogInResource(ModelResource):
    class Meta:
        queryset = LogIn.objects.all()
        resource_name = 'login'
        authorization = Authorization()
        allowed_methods = ['post']

class UserResource(ModelResource):
    class Meta:
            queryset = User.objects.all()
            resource_name = 'user'
            authorization = Authorization()
            authentication = Authentication()
            allowed_methods = ['get', 'post']
            validation = UserValidation()


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

    def dehydrate(self, bundle):
        bundle.data["professor"]=bundle.obj.professor.user_name
        bundle.data["student"]=bundle.obj.student.user_name
        return bundle

class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = 'professor/assignment'
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'delete']
        excludes = ['assignment_id', 'due_date', 'actual_difficulty', 'actual_time', \
        'priority', 'percent_complete', 'visible', 'description']

    def dehydrate(self, bundle):
        bundle.data["course"]=bundle.obj.course.course_id
        return bundle

class SubTaskResource(ModelResource):
    assignment = fields.ForeignKey(AssignmentResource, 'assignment')

    class Meta:
            queryset = SubTask.objects.all()
            resource_name = 'subtask'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            excludes = ['description']

    def dehydrate(self, bundle):
        bundle.data["assignment"]=bundle.obj.assignment.assignment_id
        return bundle

class OfficeHoursResource(ModelResource):
    class Meta:
            queryset = OfficeHours.objects.all()
            resource_name = 'officehours'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
