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
from django.db.utils import IntegrityError
from tastypie.exceptions import ImmediateHttpResponse
from tastypie.http import HttpBadRequest
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
    def dehydrate(self, bundle):
        bundle.data['points'] = bundle.obj.points
        bundle.data.pop('passwd', None)
        return bundle

class TopFiveResource(ModelResource):
    class Meta:
        queryset = User.objects.all().order_by('-points')[:5]
        resource_name = 'leaderboard'
        authorization = Authorization()
        allowed_methods = ['get']

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
            return bundle
        except IndexError:
            return bundle

    def obj_create(self, bundle, request=None, **kwargs):
        try:
            assignment_id = bundle.data['course'].split('/')[4] + '_' + bundle.data['assignment_name']
            course = (Course.objects.all().get(course_id=bundle.data['course'].split('/')[4]))
        except (ObjectDoesNotExist, KeyError):
            raise ImmediateHttpResponse(HttpBadRequest("This course does not exist."))
        students = course.students.all()
        try:
            Assignment.objects.create(assignment_id=assignment_id, assignment_name=bundle.data['assignment_name'], assignment_type=bundle.data['assignment_type'], course=course, due_date=bundle.data['due_date'], expected_difficulty=bundle.data['expected_difficulty'], expected_time=bundle.data['expected_time'], description=bundle.data['description'])
        except (KeyError, IntegrityError):
            raise ImmediateHttpResponse(HttpBadRequest("Duplicate assignment or you're forgetting something"))
        for stud in students:
            StudentAssignment.objects.create(student_assignment_id=assignment_id+'_'+stud.user_name, student=stud, assignment=Assignment.objects.all().get(assignment_id=assignment_id))
        bundle = self.full_hydrate(bundle)
        return bundle

    def dehydrate(self, bundle):
        #Create instance of assignment for all students in this course
        bundle.data["course"] = bundle.obj.course.course_id
        bundle.data['assignment_id'] = bundle.obj.assignment_id
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

    def hydrate(self, bundle):
        return bundle
    def dehydrate(self, bundle):
        return bundle

    def obj_update(self, bundle, request=None, **kwargs):
        try:
            print('in update')
            curr_student = User.objects.all().get(user_name=bundle.data['user_name'])
            student_assignment = StudentAssignment.objects.all().get(student_assignment_id=bundle.request.path.split('/')[6], student=curr_student)
            points = 0.0
            if bundle.data['done']=='True' and not student_assignment.done:
                points =points +5.0
                if bundle.data['actual_difficulty'] is not None and bundle.data['actual_time'] is not None:
                    points = points+ 10.0
                    User.objects.filter(user_name=curr_student.user_name).update(points=curr_student.points+points)
                    StudentAssignment.objects.all().filter(student_assignment_id=bundle.request.path.split('/')[6], student=curr_student).update(done=True, actual_time=bundle.data['actual_time'], actual_difficulty=int(bundle.data['actual_difficulty']))
            bundle = self.full_hydrate(bundle)
            return bundle
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
            'student': ALL,
            'course': ALL
        }

    def hydrate(self, bundle):
        assignment = Assignment.objects.all().get(assignment_id=bundle.data['assignment'].split('/')[5])
        bundle.data['student_assignment_id'] = str(assignment.assignment_id) + '_'+bundle.data['student'].split('/')[4]
        return bundle

    #TODO write dehydrate method to call algorithm
    def dehydrate(self, bundle):
        assignment = Assignment.objects.all().get(assignment_id=bundle.data['assignment'].split('/')[5])
        bundle.data['assignment_id'] = assignment.assignment_id
        bundle.data['description'] = assignment.description
        bundle.data['due_date'] = assignment.due_date
        bundle.data['course'] = assignment.course
        bundle.data['assignment_name'] = assignment.assignment_name
        bundle.data['assignment_type'] = assignment.assignment_type
        bundle.data['expected_time'] = assignment.expected_time
        bundle.data['expected_difficulty'] = assignment.expected_difficulty
        bundle.data.pop('session_key', None)
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
