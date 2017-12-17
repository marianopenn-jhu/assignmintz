# backend/resources.py

from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from backend.models import User, Assignment, StudentAssignment, SubTask, Course, OfficeHours, LogIn, LogOut
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie import fields, bundle
from backend.validation import UserValidation, CourseValidation, AssignmentValidation, \
    SubtaskValidation, LoginValidation, LogOutValidation, AssignmentUpdateValidation
from backend.authorization import UserAuthorization, AssignmentAuthorization, \
    CourseAuthorization, StudentCourseAuthorization, StudentAssignmentAuthorization, StudentSubTaskAuthorization
import uuid
import hashlib
from django.core.exceptions import ObjectDoesNotExist
# from django.contrib.auth.models import User


class LogInResource(ModelResource):

    class Meta:
        queryset = LogIn.objects.all()
        resource_name = 'login'
        authorization = Authorization()
        validation = LoginValidation()
        allowed_methods = ['post']
        always_return_data = True
        include_resource_uri = False

    def hydrate(self, bundle):
        bundle.data['session_key'] = uuid.uuid4().hex
        return bundle

    def dehydrate(self, bundle):
        bundle.data.pop('passwd', None)
        return bundle


class LogOutResource(ModelResource):
    class Meta:
        queryset = LogOut.objects.all()
        resource_name = 'logout'
        authorization = Authorization()
        validation = LogOutValidation()
        allowed_methods = ['post']


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        authorization = UserAuthorization()
        authentication = Authentication()
        allowed_methods = ['get', 'post']
        excludes = ['points']
        validation = UserValidation()
        filtering = {
            'user_name': ALL,
            'name': ALL,
            'role': ALL
        }

    def hydrate(self, bundle):
        salt = uuid.uuid4().hex
        bundle.data['passwd'] = hashlib.sha256(salt.encode() + bundle.data['passwd'].encode()).hexdigest() + ':' + salt
        return bundle


class CourseResource(ModelResource):
    professor = fields.ForeignKey(UserResource, 'professor')
    students = fields.ManyToManyField(UserResource, 'students')

    class Meta:
        queryset = Course.objects.all()
        resource_name = 'course'
        authorization = CourseAuthorization()
        allowed_methods = ['get', 'post', 'delete', 'put']
        validation = CourseValidation()
        excludes = []
        filtering = {
            'course_id': ALL,
            'professor': ALL,
            'students': ALL,
            'course_title': ALL
        }

    def hydrate(self, bundle):
        bundle.data['user_name'] = bundle.data['user_name']
        bundle.data['session_key'] = bundle.data['session_key']
        return bundle

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
            course_id = bundle.request.path.split('/')[5]

            for related_bundle in bundle.data[field]:
                student = User.objects.get(user_name=related_bundle.obj.user_name)
                related_objects.append(student)
                assignments = (Assignment.objects.filter(course_id=course_id))
                course = (Course.objects.all().get(course_id=course_id))
                for assignment in assignments:
                    StudentAssignment.objects.create(student_assignment_id=assignment.assignment_id+'_'+student.user_name, student=student, assignment=Assignment.objects.all().get(assignment_id=assignment.assignment_id))
            manager.add(*related_objects)

    class Meta:
        queryset = Course.objects.all()
        resource_name = 'student/course'
        authorization = StudentCourseAuthorization()
        allowed_methods = ['put']
        excludes = []
        filtering = {
            'course_id': ALL,
            'professor': ALL,
            'students': ALL
        }


class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = 'professor/assignment'
        authorization = AssignmentAuthorization()
        allowed_methods = ['get', 'post', 'delete', 'put']
        validation = AssignmentValidation()
        excludes = []
        filtering = {
            'assignment_id': ALL,
            'assignment_name': ALL,
            'assignment_type': ALL,
            'course': ALL,
            'due_date': ALL
        }

    def hydrate(self, bundle):
        if bundle.request.method == 'PUT':
            return bundle
        try:
            bundle.data['assignment_id'] = bundle.data['course'].split('/')[4] + '_'+ bundle.data['assignment_name']
        except IndexError:
            pass
        return bundle

    def dehydrate(self, bundle):
        #Create instance of assignment for all students in this course
        course = (Course.objects.all().get(course_id=bundle.data['course'].split('/')[4]))
        students = course.students.all()
        for stud in students:
            StudentAssignment.objects.create(student_assignment_id=bundle.obj.assignment_id+'_'+stud.user_name, student=stud, assignment=Assignment.objects.all().get(assignment_id=bundle.obj.assignment_id))
        bundle.data["course"] = bundle.obj.course.course_id
        bundle.data['assignment_id'] = bundle.obj.assignment_id
        bundle.data.pop('expected_difficulty', None)
        bundle.data.pop('expected_time', None)
        bundle.data.pop('due_date', None)
        bundle.data.pop('user_name', None)
        bundle.data.pop('session_key', None)
        bundle.data.pop('description', None)
        bundle.data.pop('assignment_name', None)
        bundle.data.pop('assignment_type', None)
        bundle.data.pop('course', None)
        return bundle


class EditStudentAssignmentResource(ModelResource):

    class Meta:
        queryset = StudentAssignment.objects.all()
        resource_name = 'student/update/assignment'
        authorization = StudentAssignmentAuthorization()
        allowed_methods = ['put']
        validation = AssignmentUpdateValidation()
        always_return_data = True
        include_resource_uri = False
        excludes = []
        filtering = {
            'student': ALL
        }
    def obj_update(self, bundle, request=None, **kwargs):
        try:
            curr_student = User.objects.all().get(user_name=bundle.data['user_name'])
            student_assignment = StudentAssignment.objects.all().get(student_assignment_id=bundle.request.path.split('/')[6], student=curr_student)
            points = 0.0
            if bundle.data['done']=='True' and not student_assignment.done:
                points =points +5.0
                if bundle.data['actual_difficulty'] is not None and bundle.data['actual_time'] is not None:
                    points = points+ 10.0
                User.objects.filter(user_name=curr_student.user_name).update(points=curr_student.points+points)
            bundle = self.full_hydrate(bundle)
        except (KeyError, ObjectDoesNotExist):
            pass
        return bundle


class StudentAssignmentResource(ModelResource):
    student = fields.ForeignKey(UserResource, 'student')
    assignment = fields.ToOneField(AssignmentResource, 'assignment')

    class Meta:
        queryset = StudentAssignment.objects.all()
        resource_name = 'student/assignment'
        authorization = StudentAssignmentAuthorization()
        allowed_methods = ['get', 'post', 'put']
        validation = AssignmentUpdateValidation()
        always_return_data = True
        include_resource_uri = False
        excludes = []
        filtering = {
            'student': ALL
        }

    def hydrate(self, bundle):
        print('in student hydrate')
        assignment = Assignment.objects.all().get(assignment_id=bundle.data['assignment'].split('/')[5])
        bundle.data['student_assignment_id'] = str(assignment.assignment_id) + '_'+bundle.data['student'].split('/')[4]
        return bundle

    #TODO write dehydrate method to call algorithm
    def dehydrate(self, bundle):
        bundle.data.pop('actual_difficulty', None)
        bundle.data.pop('actual_time', None)
        bundle.data.pop('assignment_id', None)
        bundle.data.pop('done', None)
        bundle.data.pop('priority', None)
        bundle.data.pop('session_key', None)
        bundle.data.pop('student', None)
        bundle.data.pop('pk', None)
        return bundle


class SubTaskResource(ModelResource):
    student_assignment = fields.ForeignKey(StudentAssignmentResource, 'student_assignment')

    class Meta:
            queryset = SubTask.objects.all()
            resource_name = 'subtask'
            authorization = StudentSubTaskAuthorization()
            allowed_methods = ['get', 'post', 'delete']
            validation = SubtaskValidation()
            excludes = []
            filtering = {
                'subtask': ALL,
                'subtask_name': ALL,
                'student_assignment': ALL
            }

    def hydrate(self, bundle):
        try:
            bundle.data['subtask_id'] = bundle.data['student_assignment'].split('/')[5] + '_' + bundle.data['subtask_name']
        except IndexError:
            pass
        return bundle

    def dehydrate(self, bundle):
        bundle.data["assignment"] = bundle.obj.assignment.assignment_id
        return bundle


class OfficeHoursResource(ModelResource):
    class Meta:
            queryset = OfficeHours.objects.all()
            resource_name = 'officehours'
            authorization = CourseAuthorization()
            allowed_methods = ['get', 'post', 'delete']
            filtering = {
                'professor_id': ALL,
                'ta_name': ALL
            }
