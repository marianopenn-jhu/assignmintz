from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.


class LogIn(models.Model):
    user_name = models.CharField(max_length=36, default='', primary_key=True)
    passwd = models.CharField(max_length=36, default='')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, default='')

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __unicode__(self):
        return self.user_name


class Course(models.Model):
    course_id = models.CharField(max_length=36, primary_key=True)
    professor = models.ForeignKey(Profile, related_name='professor', null=True, on_delete=models.CASCADE)
    students = models.ManyToManyField(Profile, related_name='students')
    # student = models.ForeignKey(User, related_name='student', null=True, on_delete=models.CASCADE)
    course_title = models.CharField(max_length=36, default='')
    visible = models.BooleanField(default=True)
    description = models.TextField()

    def __unicode__(self):
        return self.course_title


class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    assignment_name = models.CharField(max_length=36, default='')
    assignment_type = models.CharField(max_length=5, default='')
    course = models.ForeignKey('Course', related_name='course', null=True, on_delete=models.CASCADE)
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
    assignment = models.ForeignKey('Assignment', on_delete=models.CASCADE)


class OfficeHours(models.Model):
    professor_id = models.CharField(max_length=36, primary_key=True)
    ta_name = models.CharField(max_length=36)
    office_hours = models.ForeignKey('OfficeHours')


class OfficeHour(models.Model):
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField(auto_now=False, auto_now_add=False)
