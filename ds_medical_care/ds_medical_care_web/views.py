from django.shortcuts import render

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.renderers import HTMLFormRenderer, JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser

from django.contrib.auth.models import User
from ds_medical_care_web.serializers import UserSerializer
# from ds_medical_care_web.models import ParentUser

def index(request):
  return render(request, 'ds_medical_care_web/index.html', {})

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
