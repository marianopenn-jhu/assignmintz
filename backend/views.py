from django.shortcuts import render, render_to_response
from backend.api.resources import  CourseResource
import psycopg2

# Create your views here.
# def student_detail(request, username):
#     res = StudentResource()
#     request_bundle = res.build_bundle
#
# def student_course_list(request, username):
#     res = CourseResource()
#     request_bundle = res.build_bundle(request=request)
#     conn = psycopg2.connect(dbname='assignmintz', user='postgres', host='localhost')
#     cur = conn.cursor()
#     cur.execute('SELECT courses_id from backend_student where user_name=\''+username+'\';')
#     student = res.obj_get(request_bundle, username=username)
