from django.conf.urls import url

from . import views

app_name = 'users'
urlpatterns = [
    url(
        regex=r'^$',
        view=views.model_form_upload,
        name='list'
    ),
    url(
        regex=r'^vote/(?P<pk>[0-9]+)$',
        view=views.Vote.as_view(),
        name='vote'
    ),
]
