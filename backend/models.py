from django.db import models
# from django.contrib.auth.models import User

# Create your models here.


class LogIn(models.Model):
    user_name = models.CharField(max_length=36, default='', primary_key=True)
    session_key = models.CharField(max_length=36, default='')

    def __unicode__(self):
        return self.user_name


class LogOut(models.Model):
    user_name = models.CharField(max_length=36, default='', primary_key=True)

    def __unicode__(self):
        return self.user_name


class User(models.Model):
    user_name = models.CharField(max_length=36, default='', primary_key=True)
    name = models.CharField(max_length=40, default='')
    email = models.EmailField(max_length=256, default='')
    passwd = models.CharField(max_length=256, default='')
    role = models.CharField(max_length=10, default='')

    def __unicode__(self):
        return self.user_name


class Course(models.Model):
    course_id = models.CharField(max_length=36, primary_key=True)
    professor = models.ForeignKey(User, related_name='professor', null=False, default='', on_delete=models.CASCADE)
    students = models.ManyToManyField(User, related_name='student')
    course_title = models.CharField(max_length=36, default='', null=False)
    visible = models.BooleanField(default=True)
    description = models.TextField()

    def __unicode__(self):
        return self.course_title


class Assignment(models.Model):
    assignment_id = models.CharField(primary_key=True, default='', max_length=256)
    assignment_name = models.CharField(max_length=36, default='')
    assignment_type = models.CharField(max_length=5, default='')
    course = models.ForeignKey('Course', related_name='course', null=True, on_delete=models.CASCADE)
    due_date = models.DateTimeField(blank=True, null=True)
    expected_difficulty = models.IntegerField(default=0)
    expected_time = models.FloatField(default=0.0)
    description = models.TextField(default='')

    def __unicode__(self):
        return self.assignment_name


class StudentAssignment(models.Model):
    student_assignment_id = models.CharField(primary_key=True, default='', max_length=256)
    student = models.ForeignKey('User', related_name='pupil',on_delete=models.CASCADE)
    assignment = models.ForeignKey('Assignment', null=True, on_delete=models.CASCADE, related_name='professor_assignment')
    actual_difficulty = models.IntegerField(default=0)
    actual_time = models.FloatField(default=0.0)
    priority = models.IntegerField(default=0)
    done = models.BooleanField(default=False)

    def __unicode__(self):
        return self.student_assignment_id


class SubTask(models.Model):
    subtask_id = models.CharField(max_length=36, primary_key=True)
    subtask_name = models.CharField(max_length=36)
    visible = models.BooleanField(default=True)
    description = models.TextField(default='')
    assignment_id = models.ForeignKey('StudentAssignment', on_delete=models.CASCADE)


class OfficeHours(models.Model):
    professor_id = models.CharField(max_length=36, primary_key=True)
    ta_name = models.CharField(max_length=36)
    office_hours = models.ForeignKey('OfficeHours')


class OfficeHour(models.Model):
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField(auto_now=False, auto_now_add=False)
