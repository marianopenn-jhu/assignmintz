# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-11 23:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='courses',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Course'),
        ),
        migrations.AlterField(
            model_name='professor',
            name='students',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Student'),
        ),
        migrations.AlterField(
            model_name='student',
            name='courses',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Course'),
        ),
        migrations.AlterField(
            model_name='teachingassistant',
            name='office_hours',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.OfficeHours'),
        ),
    ]
