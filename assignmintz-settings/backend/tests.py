from django.test import TestCase
from django.test import Client
from tastypie.test import ResourceTestCaseMixin
from backend.validation import UserValidation
from tastypie.bundle import Bundle
import datetime

# Create your tests here.
class UserResourceTest(ResourceTestCaseMixin, TestCase):
    def setUp(self):
        super(UserResourceTest, self).setUp()

    #PUT method is not allowed for User resource
    def test_bad_method(self):
        self.user_post_data = {
            'user_name':'harrypotter',
            'name':'harry',
            'email':'harrypotter@jhu.edu',
            'passwd':'1234',
            'role':'student'
        }
        self.assertHttpMethodNotAllowed(self.api_client.put('/backend/v1/user/', format='json'))
        print('Method not allowed test passed')

    def test_invalid_email(self):
        #not @jhu.edu
        self.invalid_user_post_data = {
            'user_name': 'harrypotter',
            'name': 'harry',
            'email': 'harrypotter@gmail.edu',
            'passwd': '1234',
            'role': 'student'
        }

        #JHED instead of email
        self.invalid_user_post_data_2 = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'harrypotter1',
            'passwd': '1234',
            'role': 'student'
        }

        #valid
        self.valid_user_post_data = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'harrypotter2@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }

        #duplicate email
        self.invalid_user_post_data_3 = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'harrypotter2@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }

        #valid
        self.valid_user_post_data_2 = {
            'user_name': 'harrypotter2',
            'name': 'harry',
            'email': 'harrypotter2@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }

        resp1 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp2)
        respValid = self.api_client.post('/backend/v1/user/', format='json', data=self.valid_user_post_data)
        self.assertHttpCreated(respValid)
        resp3 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp3)
        respValid2 = self.api_client.post('/backend/v1/user/', format='json', data=self.valid_user_post_data_2)
        self.assertHttpCreated(respValid2)

    def test_invalid_role(self):
        #role is teacher
        self.invalid_user_post_data = {
            'user_name': 'harrypotter',
            'name': 'harry',
            'email': 'harrypotter@gmail.edu',
            'passwd': '1234',
            'role': 'teacher'
        }

        #role is students
        self.invalid_user_post_data_2 = {
            'user_name': 'harrypotter1',
            'name': 'harry',
            'email': 'harrypotter1@jhu.edu',
            'passwd': '1234',
            'role': 'students'
        }

        #valid
        self.valid_user_post_data = {
            'user_name': 'harrypotter2',
            'name': 'harry',
            'email': 'harrypotter2@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }

        #valid
        self.valid_user_post_data_2 = {
            'user_name': 'harrypotter21',
            'name': 'harry',
            'email': 'harrypotter3@jhu.edu',
            'passwd': '1234',
            'role': 'PRoFEsSOR'
        }

        resp1 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp2)
        resp_valid = self.api_client.post('/backend/v1/user/', format='json', data=self.valid_user_post_data)
        self.assertHttpCreated(resp_valid)
        resp_valid_2 = self.api_client.post('/backend/v1/user/', format='json', data=self.valid_user_post_data_2)
        self.assertHttpCreated(resp_valid_2)

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

        # valid
        self.valid_user_post_data = {
            'user_name': 'harrypotter2',
            'name': 'harry',
            'email': 'harrypotter2@jhu.edu',
            'passwd': '1234',
            'role': 'student'
        }

        resp1 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data)
        self.assertHttpBadRequest(resp1)
        resp2 = self.api_client.post('/backend/v1/user/', format='json', data=self.invalid_user_post_data_2)
        self.assertHttpBadRequest(resp2)
        resp_valid = self.api_client.post('/backend/v1/user/', format='json', data=self.valid_user_post_data)
        self.assertHttpCreated(resp_valid)

    # def test_duplicate_user(self):
        # c = Client()
        # user_name = datetime.datetime.now()
        # self.user_post_data = {
        #     'user_name': 'harrypotter',
        #     'name':'harry',
        #     'email':'harrypotter@jhu.edu',
        #     'passwd':'1234',
        #     'role':'student'
        # }
        #
        # resp = c.post('/backend/v1/user/', format='json', data=self.user_post_data)
        # print(str(resp))
        # resp2 = c.post('/backend/v1/user/', format='json', data=self.user_post_data)
        # print(str(resp2))
