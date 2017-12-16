# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-14 20:37
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20171214_2035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentassignment',
            name='assignment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='professor_assignment', to='backend.Assignment'),
        ),
    ]
