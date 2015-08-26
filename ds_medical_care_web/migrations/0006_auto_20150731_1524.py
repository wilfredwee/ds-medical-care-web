# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0005_auto_20150724_1851'),
    ]

    operations = [
        migrations.CreateModel(
            name='SleepBehavior',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('average_sleep', models.IntegerField()),
                ('has_regular_bedtime', models.CharField(max_length=3, choices=[(b'yes', b'Yes'), (b'no', b'No'), (b'idk', b"I don't know")])),
            ],
        ),
        migrations.AddField(
            model_name='child',
            name='ENC',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AddField(
            model_name='child',
            name='MRN',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AddField(
            model_name='child',
            name='PHN',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AddField(
            model_name='child',
            name='gender',
            field=models.CharField(default='male', max_length=200, choices=[(b'male', b'male'), (b'female', b'female')]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='child',
            name='date_of_birth',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='child',
            name='first_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='child',
            name='last_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AddField(
            model_name='child',
            name='sleep_behavior',
            field=models.OneToOneField(default='', blank=True, to='ds_medical_care_web.SleepBehavior'),
            preserve_default=False,
        ),
    ]
