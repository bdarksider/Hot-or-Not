from django.conf.urls import url

from . import views

app_name = 'users'
urlpatterns = [
    url(
        regex=r'^$',
        view=views.MatchView.as_view(),
        name='match'
    ),
    url(
        regex=r'^next$',
        view=views.NextGame.as_view(),
        name='next-game'
    ),
    url(
        regex=r'^upload$',
        view=views.model_form_upload,
        name='upload'
    ),
    url(
        regex=r'^vote/(?P<pk>[0-9]+)$',
        view=views.Vote.as_view(),
        name='vote'
    ),
]
