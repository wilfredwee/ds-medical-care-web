# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0009_child_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='child',
            name='picture',
            field=models.ImageField(upload_to=b'children', blank=True),
        ),
    ]
