from django.test import TestCase
from tastypie.test import ResourceTestCaseMixin


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
            'user_name': 'dumbledore',
            'name': 'Albus',
            'email': 'albusdumbledore@jhu.edu',
            'passwd': 'chocolate_frogs',
            'role': 'professor'
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
            "course":  "/backend/v1/course/601.421/",
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

    # PUT method is not allowed for User resource
    def test_bad_method(self):
        self.assertHttpMethodNotAllowed(self.api_client.put(self.user_url, format='json', data=self.student_user))
        print('Method not allowed test passed')

    def test_valid_post(self):
        resp1 = self.api_client.post(self.user_url, format='json', data=self.student_user)
        self.assertHttpCreated(resp1)
        resp2 = self.api_client.post(self.user_url, format='json', data=self.professor_user)
        self.assertHttpCreated(resp2)
        resp3 = self.api_client.post(self.course_url, format='json', data=self.oose_course)
        self.assertHttpCreated(resp3)
        resp4 = self.api_client.post(self.assignment_url, format='json', data=self.oose_assignment_1)
        self.assertHttpCreated(resp4)
        resp5 = self.api_client.post(self.subtask_url, format='json', data=self.oose_subtask_1)
        self.assertHttpCreated(resp5)
        print('Valid post test passed')

    def test_invalid_email(self):
        # not @jhu.edu
        self.invalid_user_post_data = {
            'user_name': 'harrypotter',
            'name': 'harry',
            'email': 'harrypotter@gmail.edu',
            'passwd': '1234',
            'role': 'student'
        }

        # JHED instead of email
        self.invalid_user_post_data_2 = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'harrypotter1',
            'passwd': '1234',
            'role': 'student'
        }

        # duplicate email
        self.invalid_user_post_data_3 = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'harrypotter@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }

        resp1 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp2)
        resp3 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp3)
        print('Invalid email test passed')

    def test_invalid_role(self):
        # role is teacher
        self.invalid_user_post_data = {
            'user_name': 'harrypotter',
            'name': 'harry',
            'email': 'test@gmail.edu',
            'passwd': '1234',
            'role': 'teacher'
        }

        # role is students
        self.invalid_user_post_data_2 = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'test1@jhu.edu',
            'passwd': '1234',
            'role': 'students'
        }

        resp1 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp2)
        print('Invalid role tests passed')

    def test_empty_field(self):
        # forgot name
        self.invalid_user_post_data = {
            'user_name': 'harrypotter',
            'name': '',
            'email': 'harrypotter@jhu.edu',
            'passwd': '1234',
            'role': 'teacher'
        }

        # forgot user_name and passwd
        self.invalid_user_post_data_2 = {
            'user_name': '',
            'name': 'harry',
            'email': 'harrypotter1@jhu.edu',
            'passwd': '',
            'role': 'student'
        }

        resp1 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.user_url, format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp2)
        print('Empty field test passed')

    def test_invalid_course_user_combo(self):
        # professor does not exist
        self.oose_invalid_prof_course = {
            "course_id": "601.421",
            "course_title": "OOSE",
            "visible": "True",
            "description": "A series of project iterations.",
            "professor": "/backend/v1/user/harrypotter/",
            "student": "/backend/v1/user/dumbledor/"
        }

        # student does not exist
        self.oose_invalid_student_course = {
            "course_id": "601.421",
            "course_title": "OOSE",
            "visible": "True",
            "description": "A series of project iterations.",
            "professor": "/backend/v1/user/harrypotte/",
            "student": "/backend/v1/user/dumbledore/"
        }

        resp1 = self.api_client.post(self.course_url, format='json', data=self.oose_invalid_prof_course)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post(self.course_url, format='json', data=self.oose_invalid_student_course)
        self.assertHttpBadRequest(resp2)
        print('Invalid course student combo passed')

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
        self.assertHttpBadRequest(resp)
