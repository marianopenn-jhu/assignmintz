# backend/resources.py

from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from backend.models import User, Assignment, SubTask, Course, OfficeHours, LogIn
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie import fields, bundle
from backend.validation import UserValidation, CourseValidation, AssignmentValidation, SubtaskValidation, LoginValidation
import uuid
import hashlib
# from django.contrib.auth.models import User


class LogInResource(ModelResource):
    session_key = uuid.uuid4().hex
    class Meta:
        queryset = LogIn.objects.all()
        resource_name = 'login'
        authorization = Authorization()
        validation = LoginValidation()
        allowed_methods = ['post']
        always_return_data = True
        include_resource_uri = False

    def hydrate(self, bundle):
        print(self.session_key)
        bundle.data['session_key'] = self.session_key
        return bundle

    def dehydrate(self, bundle):
        print(self.session_key)
        bundle.data.pop('passwd', None)
        bundle.data['session_key'] = self.session_key
        return bundle

class UserResource(ModelResource):
    class Meta:
            queryset = User.objects.all()
            resource_name = 'user'
            authorization = Authorization()
            authentication = Authentication()
            allowed_methods = ['get', 'post']
            validation = UserValidation()
            filtering = {
                'user_name': ALL,
                'name': ALL,
                'role':ALL
            }

    def hydrate(self, bundle):
        salt = uuid.uuid4().hex
        bundle.data['passwd'] = hashlib.sha256(salt.encode() + bundle.data['passwd'].encode()).hexdigest() + ':' + salt
        return bundle

class CourseResource(ModelResource):
    professor = fields.ForeignKey(UserResource, 'professor')
    students = fields.ManyToManyField(UserResource, 'students')
    #student = fields.ForeignKey(UserResource, 'student')
    class Meta:
        queryset = Course.objects.all()
        resource_name = 'course'
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'delete', 'put']
        validation = CourseValidation()
        excludes = []
        filtering = {
            'course_id': ALL,
            'professor':ALL,
            'students': ALL,
            'course_title': ALL
        }

class AddStudentToCourseResource(ModelResource):
    professor = fields.ForeignKey(UserResource, 'professor')
    students = fields.ManyToManyField(UserResource, 'students')

    def save_m2m(self, bundle):
        for field, obj in self.fields.items():
            if not getattr(obj, 'is_m2m', False):
                continue

            if not obj.attribute:
                continue

            if obj.readonly:
                continue

            manager = getattr(bundle.obj, obj.attribute)
            related_objects = []

            for related_bundle in bundle.data[field]:
                student = User.objects.get(user_name=related_bundle.obj.user_name)
                related_objects.append(student)
            manager.add(*related_objects)

    class Meta:
        queryset = Course.objects.all()
        resource_name = 'student/course'
        authorization = Authorization()
        allowed_methods = ['post', 'delete']
        excludes = []
        filtering = {
            'course_id': ALL,
            'professor':ALL,
            'students': ALL
        }



class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = 'professor/assignment'
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'delete']
        validation = AssignmentValidation();
        excludes = ['assignment_id', 'due_date', 'actual_difficulty', 'actual_time', \
                    'priority', 'percent_complete', 'visible', 'description']
        filters = {
            'assignment_id':ALL,
            'assignment_name':ALL,
            'assignment_type':ALL,
            'course':ALL,
            'due_date':ALL
        }

    def dehydrate(self, bundle):
        bundle.data["course"] = bundle.obj.course.course_id
        return bundle


class SubTaskResource(ModelResource):
    assignment = fields.ForeignKey(AssignmentResource, 'assignment')

    class Meta:
            queryset = SubTask.objects.all()
            resource_name = 'subtask'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            validation = SubtaskValidation()
            excludes = ['description']
            filters = {
                'subtask_id':ALL,
                'subtask_name':ALL,
                'assignment':ALL
            }

    def dehydrate(self, bundle):
        bundle.data["assignment"] = bundle.obj.assignment.assignment_id
        return bundle


class OfficeHoursResource(ModelResource):
    class Meta:
            queryset = OfficeHours.objects.all()
            resource_name = 'officehours'
            authorization = Authorization()
            allowed_methods = ['get', 'post', 'delete']
            filters = {
                'professor_id':ALL,
                'ta_name':ALL
            }
