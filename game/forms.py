from django import forms
from .models import Food

class GameForm(forms.ModelForm):
    class Meta:
        model = Food
        fields = ('image',)