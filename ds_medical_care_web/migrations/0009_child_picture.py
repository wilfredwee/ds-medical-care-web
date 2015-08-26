# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0008_auto_20150731_1530'),
    ]

    operations = [
        migrations.AddField(
            model_name='child',
            name='picture',
            field=models.ImageField(upload_to=b'', blank=True),
        ),
    ]
