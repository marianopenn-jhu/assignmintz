from django.db import models

# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=36, primary_key=True)
    name = models.CharField(max_length=36, default='')
    email = models.EmailField(max_length=256, default='')
    passwd = models.CharField(max_length=36, default='')
    role = models.CharField(max_length=36, default='')

class Assignment(models.Model):
    assignment_id = models.CharField(max_length=36, primary_key=True)
    assignment_type = models.CharField(max_length=5, default='')
    professor_id = models.CharField(max_length=36)
    due_date = models.TimeField(auto_now=True)
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

# def __str__(self):
#      return '%s %s' % (self.user_name, self.email)
