# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0003_child'),
    ]

    operations = [
        migrations.AddField(
            model_name='parentprofile',
            name='address',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AddField(
            model_name='parentprofile',
            name='city',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AddField(
            model_name='parentprofile',
            name='participant_code',
            field=models.CharField(max_length=6, blank=True),
        ),
        migrations.AddField(
            model_name='parentprofile',
            name='phone_number',
            field=models.CharField(max_length=12, blank=True),
        ),
        migrations.AddField(
            model_name='parentprofile',
            name='postal_code',
            field=models.CharField(max_length=6, blank=True),
        ),
        migrations.AddField(
            model_name='parentprofile',
            name='province',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AlterField(
            model_name='parentprofile',
            name='parent_type',
            field=models.CharField(max_length=200, blank=True),
        ),
    ]
