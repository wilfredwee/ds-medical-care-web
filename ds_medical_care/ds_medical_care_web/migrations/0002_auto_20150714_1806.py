# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ds_medical_care_web', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ParentProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('parent_type', models.CharField(max_length=200)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='parentuser',
            name='user',
        ),
        migrations.DeleteModel(
            name='ParentUser',
        ),
    ]
