from django import forms
from .models import Match
from crispy_forms.helper import FormHelper


class MatchForm(forms.ModelForm):
    class Meta:
        model = Match
        fields = ('left_image', 'right_image', )

    def __init__(self, *args, **kwargs):
    	super(MatchForm, self).__init__(*args, **kwargs)
    	self.helper = FormHelper()