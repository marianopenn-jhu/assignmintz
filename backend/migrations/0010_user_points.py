# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-17 19:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20171216_1821'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='points',
            field=models.IntegerField(default=5),
        ),
    ]
