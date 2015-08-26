# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0006_auto_20150731_1524'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='child',
            name='sleep_behavior',
        ),
        migrations.AddField(
            model_name='sleepbehavior',
            name='child',
            field=models.OneToOneField(default=1, to='ds_medical_care_web.Child'),
            preserve_default=False,
        ),
    ]
