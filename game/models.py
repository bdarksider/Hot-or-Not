from django.db import models

class Match(models.Model):
    left_image = models.FileField(upload_to='documents/')
    right_image = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    vote_left = models.IntegerField(default=0)
    vote_right = models.IntegerField(default=0)

    def __str__(self):
    	return "Match - Vote Left: {}, Vote Right: {}".format(
    		self.vote_left, self.vote_right)