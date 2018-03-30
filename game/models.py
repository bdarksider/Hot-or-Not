from django.db import models

class Food(models.Model):
    image = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class FacebookUser(models.Model):
	email = models.EmailField()
	created_at = models.DateTimeField(auto_now_add=True)