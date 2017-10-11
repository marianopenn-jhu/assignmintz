# backend/resources.py

from tastypie.resources import ModelResource
from backend.models import User
from tastypie.authorization import Authorization

class UserResource(ModelResource):
    class Meta:
            queryset = User.objects.all()
            resource_name = 'user'
            authorization = Authorization()