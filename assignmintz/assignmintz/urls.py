'''assignmintz URL Configuration
'''
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views
# from . import views
from backend.resources import UserResource, AssignmentResource, SubTaskResource, CourseResource, OfficeHoursResource
from tastypie.api import Api

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(AssignmentResource())
v1_api.register(SubTaskResource())
v1_api.register(CourseResource())
v1_api.register(OfficeHoursResource())


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^backend/', include(v1_api.urls))
]
