from django.shortcuts import render, render_to_response
from backend.api.models import  Profile, Course
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.contrib.auth.decorators import login_required
import psycopg2

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return render()
    else:
        # Return an 'invalid login' error message.

def logout_view(request):
    logout(request)
    # Redirect to a success page.


def add_course(request, course_id):
    course = Course.objects.get(course_id=course_id)
    is_logged_in = request.user.is_authenticated()
    if is_logged_in and Profile.objects.filter(user=request.user).exists():
        student = Profile.objects.get(user=request.profile)
        course.students.add(student)
    course.save()
    return HttpResponse()