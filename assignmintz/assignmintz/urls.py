'''assignmintz URL Configuration
'''
from django.conf.urls import include, url
from django.contrib import admin
# from . import views
from backend.resources import UserResource, AssignmentResource, SubTaskResource
from tastypie.api import Api

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(AssignmentResource())
v1_api.register(SubTaskResource())


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^backend/', include(v1_api.urls))
]
