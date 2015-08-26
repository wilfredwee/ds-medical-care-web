# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0004_auto_20150720_1831'),
    ]

    operations = [
        migrations.CreateModel(
            name='SleepEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timeEvent', models.DateTimeField()),
                ('timeEntered', models.DateTimeField()),
                ('notes', models.TextField(blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='child',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2015, 7, 25, 1, 51, 24, 428000, tzinfo=utc), blank=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='child',
            name='first_name',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AlterField(
            model_name='child',
            name='id',
            field=models.AutoField(serialize=False, primary_key=True),
        ),
        migrations.AlterField(
            model_name='child',
            name='last_name',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AddField(
            model_name='sleepentry',
            name='child',
            field=models.ForeignKey(related_name='sleep_entries', to='ds_medical_care_web.Child'),
        ),
    ]
