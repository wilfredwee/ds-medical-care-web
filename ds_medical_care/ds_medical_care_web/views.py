from django.shortcuts import render

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.renderers import HTMLFormRenderer, JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser

from ds_medical_care_web.serializers import ParentUserSerializer
from ds_medical_care_web.models import ParentUser

def index(request):
  return render(request, 'ds_medical_care_web/index.html', {})


class ParentUserViewSet(viewsets.ModelViewSet):
    serializer_class = ParentUserSerializer
    queryset = ParentUser.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def pre_save(self, obj):
        obj.user = self.request.user
