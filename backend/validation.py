# backend/validation.py
from tastypie.validation import Validation
import psycopg2


class UserValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        cur = conn.cursor()

        # ensure username is unique
        query_name = str(bundle.data.get('user_name'))
        cur.execute('SELECT * from backend_user where user_name=\'' + query_name + '\';')
        if cur.fetchone() is not None:
            errs['dup_user_name'] = 'User name already exists'

        # ensure role is student or professor
        role = str(bundle.data.get('role')).upper()
        if role != 'STUDENT' and role != 'PROFESSOR':
            errs['invalid_role'] = 'Role must be either STUDENT or PROFESSOR'

        # ensure email is unique and @jhu.edu
        email = str(bundle.data.get('email')).lower()
        if '@jhu.edu' not in email:
            errs['invalid email'] = 'Must use @jhu.edu email'

        cur.execute('SELECT * from backend_user where email=\'' + email + '\';')
        if cur.fetchone() is not None:
            errs['dup_email'] = 'User with this email already exists'

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        cur.close()
        conn.close()
        return errs


class CourseValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        cur = conn.cursor()

        # ensure course id is unique
        query_name = str(bundle.data.get('course_id'))
        cur.execute('SELECT * from backend_course where course_id=\'' + query_name + '\';')
        if cur.fetchone() is not None:
            errs['dup_course_id'] = 'Course id already exists'

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        cur.close()
        conn.close()
        return errs


class AssignmentValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        cur = conn.cursor()

        # ensure assignment id is unique
        query_name = str(bundle.data.get('assignment_id'))
        cur.execute('SELECT * from backend_assignment where assignment_id=\'' + query_name + '\';')
        if cur.fetchone() is not None:
            errs['dup_assignment_id'] = 'Assignment already exists'

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        cur.close()
        conn.close()
        return errs


class SubtaskValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        cur = conn.cursor()

        # ensure subtask id is unique
        query_name = str(bundle.data.get('subtask_id'))
        cur.execute('SELECT * from backend_subtask where subtask_id=\'' + query_name + '\';')
        if cur.fetchone() is not None:
            errs['dup_subtask_id'] = 'Subtask already exists'

        # empty fields
        for key, value in bundle.data.items():
            if value == '':
                errs[key] = str(key) + ' empty, please complete'

        cur.close()
        conn.close()
        return errs
