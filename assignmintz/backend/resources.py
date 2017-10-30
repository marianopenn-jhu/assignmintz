# backend/resources.py

from tastypie.resources import ModelResource
from backend.models import User, Assignment, SubTask
from tastypie.authorization import Authorization
from backend.validation import UserValidation

class UserResource(ModelResource):
    class Meta:
            queryset = User.objects.all()
            resource_name = 'user'
            authorization = Authorization()
            allowed_methods = ['post', 'get']
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
