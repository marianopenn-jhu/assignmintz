#backend/validation.py
from tastypie.validation import Validation
import psycopg2

class UserValidation(Validation):
    def is_valid(self, bundle, request):
        print(str(bundle.data.get('user_name')))
        #print(str(bundle.data.keys()[0]))
        # for key, value in bundle.data.items():
        #     print(str(value))
        #     print(str(key))
        conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
        cur = conn.cursor()
        query_name = str(bundle.data.get('user_name'))
        #sql = 'SELECT user_name from backend_user where user_name=%s'
        cur.execute('SELECT * from backend_user where user_name=\''+query_name+'\';')
        if cur.fetchone() is not None:
            return 'User name already exists'
        cur.close()
        conn.close()
