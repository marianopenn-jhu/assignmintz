# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-16 17:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_auto_20171216_1702'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentAssignment',
            fields=[
                ('student_assignment_id', models.CharField(default='', max_length=256, primary_key=True, serialize=False)),
                ('actual_difficulty', models.IntegerField(default=0)),
                ('actual_time', models.FloatField(default=0.0)),
                ('priority', models.IntegerField(default=0)),
                ('done', models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='actual_difficulty',
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='actual_time',
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='percent_complete',
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='priority',
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='visible',
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='assignment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='professor_assignment', to='backend.Assignment'),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pupil', to='backend.User'),
        ),
    ]