from django.shortcuts import render

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import HTMLFormRenderer, JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import ParseError

from django.contrib.auth.models import User
from ds_medical_care_web.serializers import UserSerializer, ChildSerializer
from ds_medical_care_web.models import Child

from ds_medical_care_web.redcap_handlers.RedCapSessionHandler import import_redcap_records_for_parent


def index(request):
  return render(request, 'ds_medical_care_web/index.html', {})

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

class ChildViewSet(viewsets.ModelViewSet):
    serializer_class = ChildSerializer
    queryset = Child.objects.all()
    # TODO: Restrict it to child's parents only
    permission_classes = (permissions.IsAuthenticated,)

class ImportRedCapRecordsView(APIView):

    def post(self, request, format=None):
        parentIdString = request.data.get('parentId')

        if parentIdString:
            return Response(import_redcap_records_for_parent(int(parentIdString)))
        else:
            raise ParseError(detail='Request must have a parentId key')


