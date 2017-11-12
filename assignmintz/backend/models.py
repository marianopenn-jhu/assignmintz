from django.db import models

# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=36, default='', primary_key=True)
    name = models.CharField(max_length=40, default='')
    email = models.EmailField(max_length=256, default='')
    passwd = models.CharField(max_length=36, default='')

    class Meta:
        abstract = True

    def __unicode__(self):
        return self.name

class Professor(User):
    courses = models.ForeignKey('Course', null=True)
    students = models.ForeignKey('Student', null=True)

class Student(User):
    courses = models.ForeignKey('Course', null=True)

class TeachingAssistant(User):
    office_hours = models.ForeignKey('OfficeHours', null=True)

class Course(models.Model):
    course_id = models.CharField(max_length=36, primary_key=True)
    prof_name = models.CharField(max_length=36, default='')
    course_title = models.CharField(max_length=36, default='')
    visible = models.BooleanField(default=True)
    description = models.TextField()
    assignments = models.ForeignKey('Assignment')
    teaching_assistants = models.ForeignKey('TeachingAssistant')

    def __unicode__(self):
        return self.course_title

class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    assignment_name = models.CharField(max_length=36, default='')
    assignment_type = models.CharField(max_length=5, default='')
    due_date = models.DateField(auto_now=True)
    due_time = models.TimeField(auto_now=True)
    expected_difficulty = models.IntegerField(default=0)
    actual_difficulty = models.IntegerField(default=0)
    expected_time = models.FloatField(default=0.0)
    actual_time = models.FloatField(default=0.0)
    priority = models.IntegerField(default=0)
    percent_complete = models.FloatField(default=0.0)
    visible = models.BooleanField(default=True)
    description = models.TextField

    def __unicode__(self):
        return self.assignment_name

class SubTask(models.Model):
    subtask_id = models.CharField(max_length=36, primary_key=True)
    subtask_name = models.CharField(max_length=36)
    visible = models.BooleanField(default=True)
    description = models.TextField()
    assignment = models.ForeignKey('Assignment')

class OfficeHours(models.Model):
    professor_id = models.CharField(max_length=36, primary_key=True)
    ta_name = models.CharField(max_length=36)
    office_hours = models.ForeignKey('OfficeHours')

class OfficeHour(models.Model):
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField(auto_now=False, auto_now_add=False)
