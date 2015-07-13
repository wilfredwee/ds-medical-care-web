from rest_framework import serializers
from django.contrib.auth.models import User
from ds_medical_care_web.models import ParentUser

class ParentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentUser
        fields = ('id', 'user')
