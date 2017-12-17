# backend/validation.py
from tastypie.validation import Validation
import hashlib
from backend.models import User, LogIn, SubTask, Assignment, Course, StudentAssignment
from django.core.exceptions import ObjectDoesNotExist


def valid_session_key(session_key, user_name):
    queryset = LogIn.objects.all()
    try:
        queryset.get(session_key=session_key, user_name=user_name)
        return True
    except ObjectDoesNotExist:
        return False


class LoginValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # ensure username password combo is valid
        query_name = str(bundle.data.get('user_name'))
        query_pass = str(bundle.data.get('passwd'))
        queryset = User.objects.all()
        try:
            user = queryset.get(user_name=query_name)
            password, salt = user.passwd.split(':')
            if password != hashlib.sha256(salt.encode() + query_pass.encode()).hexdigest():
                errs['passwd'] = 'Invalid password.'
        except ObjectDoesNotExist:
            errs['login'] = 'Invalid username/password combination'

        return errs


class LogOutValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # check valid session key
        query_name = str(bundle.data.get('user_name'))
        query_key = str(bundle.data.get('session_key'))

        if valid_session_key(query_key, query_name):
            # delete entry
            LogIn.objects.all().get(session_key=query_key, user_name=query_name).delete()
        else:
            errs['invalid_user_and_key'] = 'Invalid username or session key'

        return errs


class UserValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}
        # ensure username is unique
        query_name = str(bundle.data.get('user_name'))
        try:
            User.objects.all().get(user_name=query_name)
            errs['dup_user_name'] = 'User name already exists'
        except ObjectDoesNotExist:
            pass

        # ensure role is student or professor
        role = str(bundle.data.get('role')).upper()
        if role != 'STUDENT' and role != 'PROFESSOR':
            errs['invalid_role'] = 'Role must be either STUDENT or PROFESSOR'

        # ensure email is unique and @jhu.edu
        email = str(bundle.data.get('email')).lower()
        if '@jhu.edu' not in email:
            errs['invalid email'] = 'Must use @jhu.edu email'

        try:
            User.objects.all().get(email=email)
            errs['dup_email'] = 'User with this email already exists'
        except ObjectDoesNotExist:
            pass

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        return errs


class CourseValidation(Validation):

    def is_valid(self, bundle, request=None):
        errs = {}

        # ensure course id is unique
        query_name = str(bundle.data.get('course_id'))
        try:
            Course.objects.all().get(course_id=query_name)
            errs['dup_course_id'] = 'Course id already exists'
        except ObjectDoesNotExist:
            pass

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'
        return errs


class AssignmentValidation(Validation):

    def is_valid(self, bundle, request=None):
        errs = {}

        # ensure assignment id is unique
        query_name = str(bundle.data.get('assignment_id'))
        try:
            Assignment.objects.all().get(assignment_id=query_name)
            errs['dup_assignment_id'] = 'Assignment already exists'
        except ObjectDoesNotExist:
            pass

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        return errs


class AssignmentUpdateValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}
        # assignment_id = str(bundle.data.get('assignment').split('/')[5])
        # obj = StudentAssignment.objects.all().get(student_id=user_name, assignment_id=assignment_id)
        # if not obj:
        #     errs['']
        return errs


class SubtaskValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # ensure subtask id is unique
        query_name = str(bundle.data.get('subtask_id'))
        try:
            SubTask.objects.all().get(subtask_id=query_name)
            errs['dup_subtask_id'] = 'Subtask already exists'
        except ObjectDoesNotExist:
            pass

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        return errs
