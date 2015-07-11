from django.conf.urls.defaults import *

urlpatterns = patterns('polls.views',
    (r'^$', 'index'),
)
