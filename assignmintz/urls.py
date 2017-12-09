'''assignmintz URL Configuration
'''
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
# from . import views
from backend.resources import LogInResource, UserResource, AssignmentResource, SubTaskResource, CourseResource, \
    AddStudentToCourseResource, LogOutResource
from tastypie.api import Api
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(AssignmentResource())
v1_api.register(SubTaskResource())
v1_api.register(CourseResource())
v1_api.register(LogInResource())
v1_api.register(AddStudentToCourseResource())
v1_api.register(LogOutResource())


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^home/',
        TemplateView.as_view(template_name='index.html'),
        name='home'),
    url(r'^backend/', include(v1_api.urls))
]

urlpatterns += staticfiles_urlpatterns()
