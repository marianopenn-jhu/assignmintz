# backend/validation.py
from tastypie.validation import Validation
import psycopg2
import hashlib


def valid_session_key(cur, session_key, user_name):
    cur.execute('SELECT * FROM backend_login WHERE user_name=\'' + user_name
                + '\' AND session_key=\'' + session_key + '\';')
    if cur.fetchone() is None:
        return False
    return True


class LoginValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        try:
            conn = psycopg2.connect(dbname='test_assignmintz', user='postgres', host='localhost')
        except Exception:
            print()
        print(conn)
        cur = conn.cursor()

        # ensure username password combo is valid
        query_name = str(bundle.data.get('user_name'))
        query_pass = str(bundle.data.get('passwd'))
        print(query_name + " : " + query_pass)
        cur.execute('SELECT passwd FROM backend_user WHERE user_name=\'' + query_name + '\';')
        fetched = cur.fetchone()
        if fetched is None:
            errs['login'] = 'Invalid username/password combination'
        else:
            password, salt = fetched.split(':')
            if password != hashlib.sha256(salt.encode() + query_pass.encode()).hexdigest():
                errs['passwd'] = 'Invalid password.'

        cur.close()
        conn.close()
        return errs


class LogOutValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        try:
            conn = psycopg2.connect(dbname='test_assignmintz', user='postgres', host='localhost')
        except Exception:
            print()
        cur = conn.cursor()

        # check valid session key
        query_name = str(bundle.data.get('user_name'))
        query_key = str(bundle.data.get('session_key'))

        if valid_session_key(cur, query_key, query_name):
            # delete entry
            cur = conn.cursor()
            cur.execute("DELETE FROM backend_login WHERE user_name = %s;", (query_name,))
            conn.commit()
        else:
            errs['invalid_user_and_key'] = 'Invalid username or session key'

        cur.close()
        conn.close()
        return errs


class UserValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        try:
            conn = psycopg2.connect(dbname='test_assignmintz', user='postgres', host='localhost')
        except Exception:
            print()
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
        try:
            conn = psycopg2.connect(dbname='test_assignmintz', user='postgres', host='localhost')
        except Exception:
            print()
        cur = conn.cursor()

        user_name = str(bundle.data.get('user_name'))
        session_key = str(bundle.data.get('session_key'))
        if valid_session_key(cur, session_key, user_name):
            # ensure course id is unique
            query_name = str(bundle.data.get('course_id'))
            cur.execute('SELECT * from backend_course where course_id=\'' + query_name + '\';')
            if cur.fetchone() is not None:
                errs['dup_course_id'] = 'Course id already exists'

            # empty fields
            for key, value in bundle.data.items():
                if value == '':
                    errs[key] = str(key) + ' empty, please complete'
        else:
            errs["invalid_user_or_session"] = "Invalid username or session key"

        cur.close()
        conn.close()
        return errs


class AssignmentValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        try:
            conn = psycopg2.connect(dbname='test_assignmintz', user='postgres', host='localhost')
        except Exception:
            print()
        cur = conn.cursor()

        user_name = str(bundle.data.get('user_name'))
        session_key = str(bundle.data.get('session_key'))
        if valid_session_key(cur, session_key, user_name):
            # ensure assignment id is unique
            query_name = str(bundle.data.get('assignment_id'))
            cur.execute('SELECT * from backend_assignment where assignment_id=\'' + query_name + '\';')
            if cur.fetchone() is not None:
                errs['dup_assignment_id'] = 'Assignment already exists'

            # empty fields
            for key, value in bundle.data.items():
                if value == '':
                    errs[key] = str(key) + ' empty, please complete'
        else:
            errs['invalid_user_and_key'] = 'Invalid username or session key'

        cur.close()
        conn.close()
        return errs


class SubtaskValidation(Validation):
    def is_valid(self, bundle, request=None):
        errs = {}

        # connect to database
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        try:
            conn = psycopg2.connect(dbname='test_assignmintz', user='postgres', host='localhost')
        except Exception:
            print()
        cur = conn.cursor()

        user_name = str(bundle.data.get('user_name'))
        session_key = str(bundle.data.get('session_key'))
        if valid_session_key(cur, session_key, user_name):
            # ensure subtask id is unique
            query_name = str(bundle.data.get('subtask_id'))
            cur.execute('SELECT * from backend_subtask where subtask_id=\'' + query_name + '\';')
            if cur.fetchone() is not None:
                errs['dup_subtask_id'] = 'Subtask already exists'

            # empty fields
            for key, value in bundle.data.items():
                if value == '':
                    errs[key] = str(key) + ' empty, please complete'
        else:
            errs['invalid_user_and_key'] = 'Invalid username or session key'

        cur.close()
        conn.close()
        return errs
