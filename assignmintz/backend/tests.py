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

    def test_bad_method(self):
        self.user_post_data = {
            'user_name':'harrypotter',
            'name':'harry',
            'email':'harrypotter@jhu.edu',
            'passwd':'1234',
            'role':'student'
        }
        self.assertHttpMethodNotAllowed(self.api_client.get('/backend/v1/user/', format='json', data=self.user_post_data))
        print('Method not allowed test passed')

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
