from django.db.models.signals import post_save

from django.db import models
from django.contrib.auth.models import User

class Child(models.Model):
    parent = models.ForeignKey('ParentProfile', related_name='children')
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

    def __unicode__(self):
        return self.first_name + " " + self.last_name



# TODO: Add relationship to Child
class ParentProfile(models.Model):
    user = models.OneToOneField(User)
    # NOTE: This is temporary, it's just to show what's possible.
    parent_type = models.CharField(max_length=200)

def create_parent_profile(sender, instance, created, **kwargs):
    if created:
        ParentProfile.objects.create(user=instance)

post_save.connect(create_parent_profile, sender=User)
