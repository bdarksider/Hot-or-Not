from django.conf.urls import url

from . import views

app_name = 'users'
urlpatterns = [
    url(
        regex=r'^$',
        view=views.model_form_upload,
        name='list'
    ),
]
