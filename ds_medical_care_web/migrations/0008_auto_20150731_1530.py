# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ds_medical_care_web', '0007_auto_20150731_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sleepbehavior',
            name='child',
            field=models.OneToOneField(related_name='sleep_behavior', to='ds_medical_care_web.Child'),
        ),
    ]
