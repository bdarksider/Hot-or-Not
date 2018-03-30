from rest_framework import serializers
from .models import Food, FacebookUser

class MatchSerializer(serializers.ModelSerializer):
	class Meta:
		model = Food
		resource_name = "match_resource"
		fields = ('id', 'image')

	# url = serializers.HyperlinkedIdentityField(
	# 	view_name='vote',
 #        lookup_field='pk'
	# )

	def update(self, instance, validated_data):
		action = self.context.get('request').data['action']
		if action:
			if action == 'vote_left':
				instance.vote_left += 1
			elif action == 'vote_right':
				instance.vote_right += 1
		instance.save()
		return instance

class FacebookUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = FacebookUser
		resource_name = "match_resource"
		fields = ('email',)

	def create(self, validated_data):
		user, _ = FacebookUser.objects.get_or_create(email=validated_data.get('email'))
		return user