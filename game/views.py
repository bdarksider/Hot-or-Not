from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

from rest_framework import generics

from .models import Match
from .forms import MatchForm
from .serializer import MatchSerializer

def model_form_upload(request):
    if request.method == 'POST':
        form = MatchForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = MatchForm()
    return render(request, 'model_form_upload.html', {
        'form': form
    })

class Vote(generics.RetrieveUpdateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

