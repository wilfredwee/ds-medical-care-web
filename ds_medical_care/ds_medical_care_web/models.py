from django.db import models
from django.contrib.auth.models import User

# TODO: Add relationship to Child
class ParentUser(models.Model):
    user = models.OneToOneField(User, related_name='parent_user')

    def __unicode__(self):
        return self.user.username
