from django.test import TestCase
from tastypie.test import ResourceTestCaseMixin
from backend.models import User, LogIn, LogOut, Course, Assignment, SubTask
import unittest
from django.db.utils import IntegrityError


# Create your tests here.
class UserResourceTest(ResourceTestCaseMixin, TestCase):
    def setUp(self):
        super(UserResourceTest, self).setUp()
        self.student_user = {
            'user_name': 'harrypotter',
            'name': 'harry',
            'email': 'harrypotter@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }
        self.professor_user = {
            "user_name": "dumbledore",
            "name": "Albus",
            "email": "albusdumbledore@jhu.edu",
            "passwd": "chocolate_frogs",
            "role": "professor"
        }
        self.login_prof = {
            "passwd": "chocolate_frogs",
            "user_name": "dumbledore"
        }
        self.logout_prof = {
            "user_name": "mcgonagall",
            "session_key": "12344321"
        }
        self.oose_course = {
            "course_id": "601.421",
            "course_title": "OOSE",
            "visible": "True",
            "description": "A series of project iterations.",
            "professor": "/backend/v1/user/dumbledore/",
            "students": ["/backend/v1/user/harrypotter/"]
        }
        self.oose_assignment_1 = {
            "assignment_id": "3",
            "assignment_name": "Iteration 3",
            "assignment_type": "hw",
            "course": "/backend/v1/course/601.421/",
            "due_date": "11/17/17",
            "due_time": "11:59 PM",
            "expected_difficulty": "3",
            "actual_difficulty": "4",
            "expected_time": "3.4",
            "actual_time": "5.4",
            "priority": "5",
            "percent_complete": "85.3",
            "visible": "True",
            "description": "Complete the iteration before time runs out"
        }
        self.oose_subtask_1 = {
            "subtask_id": "testing",
            "subtask_name": "Implement Testing",
            "visible": "True",
            "description": "Implement extensive testing",
            "assignment": "/backend/v1/professor/assignment/1/"
        }
        self.user_url = '/backend/v1/user/'
        self.course_url = '/backend/v1/course/'
        self.assignment_url = '/backend/v1/professor/assignment/'
        self.subtask_url = '/backend/v1/subtask/'
        self.login_url = '/backend/v1/login/'

    # PUT method is not allowed for User resource
    def test_bad_method(self):
        self.assertHttpMethodNotAllowed(self.api_client.put(self.user_url, format='json', data=self.student_user))
        print('Method not allowed test passed')

    def test_valid_user_post(self):
        resp1 = self.api_client.post(self.user_url, format='json', data=self.student_user)
        self.assertHttpCreated(resp1)

        print('Valid post test passed')

    def test_valid_login_post(self):
        resp1 = self.api_client.post(self.login_url, format='json', data=self.login_prof)
        self.assertHttpCreated(resp1)
        print('Valid post test passed')

    def test_valid_logout_post(self):
        login = LogIn.objects.create(user_name='mcgonagall', session_key='12344321')
        login.save()
        resp1 = self.api_client.post(self.logout_url, format='json', data=self.logout_prof)
        self.assertHttpCreated(resp1)
        print('Valid post test passed')

    def test_valid_course_post(self):
        student = User.objects.create(user_name='rweasely', name='Ron', email='rweasely@jhu.edu', passwd='pottermore',
                                      role='student')
        student.save()
        professor = User.objects.create(user_name='rhagrid', name='Rubeus', email='rhagrid@jhu.edu', passwd='fang',
                                        role='professor')
        professor.save()
        course = Course.objects.create(course_id='601.421', course_title='Defense Against the Dark Arts',
                              description='Protect yourself against dark forces', students=[student],
                              professor=professor)
        course.save()
        self.assertEqual(course.course_id, '601.421')

    def test_invalid_email(self):
        # not jhu email
        # user = User.objects.create(user_name='mc', email='mcg@gmail.com', passwd='fdfd', name='mfdfd', role='professor')
        # user.save()
        # dup email
        user = User.objects.create(user_name='mc', email='mcg@jhu.com', passwd='fdfd', name='mfdfd', role='professor')
        user.save()
        user2 = User.objects.create(user_name='mcg', email='mcg@jhu.com', passwd='fdfd', name='mfdfd', role='professor')
        print(user2.validation)
        # empty email
        print('Invalid email test passed')

    def test_invalid_role(self):
        # role is teacher
        with self.assertRaises(IntegrityError):
            User.objects.create(user_name='mc', email='mcmc@jhu.com', passwd='fdfd', name='mfdfd', role='teacher')
        # role is students
        with self.assertRaises(IntegrityError):
            User.objects.create(user_name='mc', email='mcmc@jhu.com', passwd='fdfd', name='mfdfd', role='students')
        # capitalization doesn't matter
        user = User.objects.create(user_name='mc', email='mcmc@jhu.com', passwd='fdfd', name='mfdfd', role='pROFessor')
        self.assertEqual(user, user)
        print('Invalid role tests passed')

    def test_empty_field(self):
        # forgot name
        with self.assertRaises(IntegrityError):
            User.objects.create(user_name='mcgo', email='mcgo@jhu.com', passwd='fdfd', role='professor')
        # forgot user_name and passwd
        with self.assertRaises(IntegrityError):
            User.objects.create(name='name', email='mcgo@jhu.com', role='professor')
        print('Empty field test passed')

    def test_invalid_course_user_combo(self):
        student = User.objects.create(user_name='hpotter', name='Harry', email='hpotter@jhu.edu', passwd='pottermore',
                                      role='student')
        student.save()
        professor = User.objects.create(user_name='rlupin', name='Remus', email='rlupin@jhu.edu', passwd='howl@themoon',
                                        role='professor')
        professor.save()
        self.assertEqual(student.user_name, 'hpotter')
        # with self.assertRaises(IntegrityError):
            # Course.objects.create(course_id='601.421', course_title='Defense Against the Dark Arts',
            #                      description='Protect yourself against dark forces', students=['/backend/v1/user/hpot'],
            #                      professor=professor)

        print('Invalid course student combo passed')
'''
    def test_empty_course_field(self):
        # empty title and professor
        self.oose_empty_prof_and_title_course = {
            "course_id": "621.421",
            "course_title": "",
            "visible": "True",
            "description": "A series of project iterations.",
            "professor": "",
            "student": "/backend/v1/user/dumbledor/"
        }

        # empty id and description
        self.oose_empty_id_and_desc_course = {
            "course_id": "",
            "course_title": "OOSE",
            "visible": "True",
            "description": "",
            "professor": "/backend/v1/user/harrypotte/",
            "student": "/backend/v1/user/dumbledore/"
        }

        resp1 = self.api_client.post(self.course_url, format='json', data=self.oose_empty_id_and_desc_course)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.course_url, format='json', data=self.oose_empty_prof_and_title_course)
        self.assertHttpBadRequest(resp2)
        print('Empty course fields passed')

    def test_dup_course(self):
        # empty id and description
        self.oose_dup_course = {
            "course_id": "601.421",
            "course_title": "OOSE",
            "visible": "True",
            "description": "Cool class",
            "professor": "/backend/v1/user/harrypotter/",
            "student": "/backend/v1/user/dumbledore/"
        }

        resp1 = self.api_client.post(self.course_url, format='json', data=self.oose_dup_course)
        self.assertHttpBadRequest(resp1)
        print('Dup course passed')

    def test_invalid_assignment_course_combo(self):
        self.invalid_oose_assignment_1 = {
            "assignment_id": "1",
            "assignment_name": "Iteration 1",
            "assignment_type": "hw",
            "course": "/backend/v1/course/801.400/",
            "due_date": "11/17/17",
            "due_time": "11:59 PM",
            "expected_difficulty": "3",
            "actual_difficulty": "4",
            "expected_time": "3.4",
            "actual_time": "5.4",
            "priority": "5",
            "percent_complete": "85.3",
            "visible": "True",
            "description": "Complete the iteration before time runs out"
        }
        resp1 = self.api_client.post(self.assignment_url, format='json', data=self.invalid_oose_assignment_1)
        self.assertHttpBadRequest(resp1)

    def test_empty_assignment_fields(self):
        self.oose_assignment_1_empty_fields = {
            "assignment_id": "1",
            "assignment_name": "",
            "assignment_type": "",
            "course": "/backend/v1/course/601.421/",
            "due_date": "",
            "due_time": "11:59 PM",
            "expected_difficulty": "3",
            "actual_difficulty": "",
            "expected_time": "3.4",
            "actual_time": "5.4",
            "priority": "",
            "percent_complete": "85.3",
            "visible": "",
            "description": "Complete the iteration before time runs out"
        }
        self.oose_assignment_1_empty_fields_2 = {
            "assignment_id": "",
            "assignment_name": "Iteration 1",
            "assignment_type": "hw",
            "course": "",
            "due_date": "11/17/17",
            "due_time": "",
            "expected_difficulty": "",
            "actual_difficulty": "4",
            "expected_time": "",
            "actual_time": "",
            "priority": "5",
            "percent_complete": "",
            "visible": "True",
            "description": ""
        }
        resp1 = self.api_client.post(self.assignment_url, format='json', data=self.oose_assignment_1_empty_fields)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.assignment_url, format='json', data=self.oose_assignment_1_empty_fields_2)
        self.assertHttpBadRequest(resp2)

    def test_dup_assignment(self):
        self.oose_assignment_1_dup = {
            "assignment_id": "1",
            "assignment_name": "Iteration 1",
            "assignment_type": "hw",
            "course": "/backend/v1/course/601.421/",
            "due_date": "11/17/17",
            "due_time": "11:59 PM",
            "expected_difficulty": "3",
            "actual_difficulty": "4",
            "expected_time": "3.4",
            "actual_time": "5.4",
            "priority": "5",
            "percent_complete": "85.3",
            "visible": "True",
            "description": "Complete the iteration before time runs out"
        }
        resp1 = self.api_client.post(self.assignment_url, format='json', data=self.oose_assignment_1_dup)
        self.assertHttpBadRequest(resp1)
        print('Dup assignment passed')

    def test_invalid_subtask_assignment_combo(self):
        self.invalid_oose_subtask_1 = {
            "subtask_id": "testing",
            "subtask_name": "Implement Testing",
            "visible": "True",
            "description": "Implement extensive testing",
            "assignment": "/backend/v1/professor/assignment/1/"
        }
        resp1 = self.api_client.post(self.subtask_url, format='json', data=self.invalid_oose_subtask_1)
        self.assertHttpBadRequest(resp1)

    def test_empty_subtask_fields(self):
        self.empty_oose_subtask_1 = {
            "subtask_id": "",
            "subtask_name": "Implement Testing",
            "visible": "",
            "description": "Implement extensive testing",
            "assignment": ""
        }
        self.empty_oose_subtask_2 = {
            "subtask_id": "123",
            "subtask_name": "",
            "visible": "False",
            "description": "",
            "assignment": "/backend/v1/professor/assignment/1/"
        }
        resp1 = self.api_client.post(self.subtask_url, format='json', data=self.empty_oose_subtask_1)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.subtask_url, format='json', data=self.empty_oose_subtask_2)
        self.assertHttpBadRequest(resp2)
        print("Empty subtask passed")

    def test_dup_subtask(self):
        resp = self.api_client.post(self.subtask_url, format='json', data=self.oose_subtask_1)
        self.assertHttpBadRequest(resp) '''