from django.db import models

# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=36, primary_key=True)
    name = models.CharField(max_length=36, default='')
    email = models.EmailField(max_length=256, default='')
    passwd_hash = models.CharField(max_length=36, default='')
    role = models.CharField(max_length=36, default='')

def __str__(self):
     return '%s %s' % (self.user_name, self.email)
