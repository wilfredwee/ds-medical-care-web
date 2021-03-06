from django.db.models.signals import post_save

from django.db import models
from django.contrib.auth.models import User

class SleepEntry(models.Model):
    child = models.ForeignKey('Child', related_name='sleep_entries')
    timeEvent = models.DateTimeField()
    timeEntered = models.DateTimeField()
    notes = models.TextField(blank=True)

class Child(models.Model):
    # Django creates id field automatically if no primary key specified,
    # May be useful to have this declared explicitly later on in development
    id = models.AutoField(primary_key=True)
    parent = models.ForeignKey('ParentProfile', related_name='children')
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=200, choices=(('male', 'male'), ('female', 'female')))
    PHN = models.CharField(max_length=50, blank=True)
    MRN = models.CharField(max_length=50, blank=True)
    ENC = models.CharField(max_length=50, blank=True)
    picture = models.ImageField(upload_to='children', blank=True)


    def __unicode__(self):
        return self.first_name + " " + self.last_name


class SleepBehavior(models.Model):
    YesNoIdk = (
        ('yes', 'Yes'),
        ('no', 'No'),
        ('idk', 'I don\'t know')
    )

    child = models.OneToOneField(Child, related_name='sleep_behavior')
    average_sleep = models.IntegerField()
    has_regular_bedtime = models.CharField(choices=YesNoIdk, max_length=3)

class ParentProfile(models.Model):
    user = models.OneToOneField(User)
    # NOTE: This is temporary, it's just to show what's possible.
    parent_type = models.CharField(max_length=200, blank=True)
    phone_number = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    province = models.CharField(max_length=200, blank=True)
    postal_code = models.CharField(max_length=6, blank=True)
    participant_code = models.CharField(max_length=6, blank=True)


def create_parent_profile(sender, instance, created, **kwargs):
    if created:
        ParentProfile.objects.create(user=instance)

post_save.connect(create_parent_profile, sender=User)
