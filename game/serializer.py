from rest_framework import serializers
from .models import Match

class MatchSerializer(serializers.ModelSerializer):
	class Meta:
		model = Match
		resource_name = "match_resource"
		fields = ('vote_left', 'vote_right',)

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
