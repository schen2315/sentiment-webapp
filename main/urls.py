from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^map/$', views.search, name='search'),
    url(r'^sentiment/$', views.sentiment, name='sentiment')
]