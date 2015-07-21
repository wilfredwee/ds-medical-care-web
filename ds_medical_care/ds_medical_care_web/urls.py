from django.conf.urls import patterns, url, include
from ds_medical_care_web.views import UserViewSet, ChildViewSet, ImportRedCapRecordsView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'children', ChildViewSet, base_name='child')

urlpatterns = [
    url(r'^api/importredcaprecords', ImportRedCapRecordsView.as_view()),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^accounts/', include('allauth.urls')),
]


