from django.db import models

class Document(models.Model):
    left_image = models.FileField(upload_to='documents/')
    right_image = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)