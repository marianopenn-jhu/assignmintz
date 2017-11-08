from django.db import models

# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=36, primary_key=True)
    name = models.CharField(max_length=36, default='')
    email = models.EmailField(max_length=256, default='')
    passwd = models.CharField(max_length=36, default='')
    role = models.CharField(max_length=36, default='')

    #def create(self, request):


class Course(models.Model):
    course_id = models.CharField(max_length=36, primary_key=True)
    course_title = models.CharField(max_length=36)
    visible = models.BooleanField(default=True)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Assignment(models.Model):
    assignment_id = models.CharField(max_length=36, primary_key=True)
    assignment_type = models.CharField(max_length=5, default='')
    class_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    professor_id = models.CharField(max_length=36)
    due_date = models.DateField(auto_now=True)
    due_time = models.TimeField(auto_now=True)
    expected_difficulty = models.IntegerField(default=0)
    actual_difficulty = models.IntegerField(default=0)
    expected_time = models.FloatField(default=0.0)
    actual_time = models.FloatField(default=0.0)
    priority = models.IntegerField(default=0)
    percent_complete = models.FloatField(default=0.0)
    visible = models.BooleanField(default=True)
    description = models.TextField()

class SubTask(models.Model):
    subtask_id = models.CharField(max_length=36, primary_key=True)
    subtask_name = models.CharField(max_length=36)
    visible = models.BooleanField(default=True)
    description = models.TextField()
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)

class OfficeHours(models.Model):
    professor_id = models.CharField(max_length=36, primary_key=True)
    class_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    ta_name = models.CharField(max_length=36)

class OfficeHour(models.Model):
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField(auto_now=False, auto_now_add=False)
    office_hours = models.ForeignKey(OfficeHours, on_delete=models.CASCADE)



# def __str__(self):
#      return '%s %s' % (self.user_name, self.email)
