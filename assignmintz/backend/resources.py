# backend/resources.py

from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from backend.models import Student, Professor, Assignment, SubTask, Course, OfficeHours, TeachingAssistant
from tastypie.authorization import Authorization
from tastypie import fields
from backend.validation import UserValidation

class UserResource(ModelResource):
    class Meta:
            queryset = Student.objects.all()
            resource_name = 'user'
            authorization = Authorization()
            allowed_methods = ['post', 'get']
            excludes = ['courses_id']
            validation = UserValidation()

class AssignmentResource(ModelResource):
    class Meta:
            queryset = Assignment.objects.all()
            resource_name = 'professor/assignment'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            excludes = ['due_date', 'actual_difficulty', 'actual_time', 'priority', 'percent_complete', 'visible', 'description']

class SubTaskResource(ModelResource):
    class Meta:
            queryset = SubTask.objects.all()
            resource_name = 'subtask'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            excludes = ['description']

class CourseResource(ModelResource):
    #user = fields.ForeignKey(UserResource, 'user')
    class Meta:
            queryset = Course.objects.all()
            resource_name = 'course'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            excludes = ['description']

class OfficeHoursResource(ModelResource):
    class Meta:
            queryset = OfficeHours.objects.all()
            resource_name = 'officehours'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
