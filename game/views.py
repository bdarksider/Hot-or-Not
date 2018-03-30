from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from rest_framework.renderers import TemplateHTMLRenderer

from rest_framework import generics
from rest_framework.response import Response

from .models import Food
from .forms import GameForm
from .serializer import MatchSerializer, FacebookUserSerializer

def model_form_upload(request):
    if request.method == 'POST':
        form = GameForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = GameForm()
    return render(request, 'model_form_upload.html', {
        'form': form
    })

class Vote(generics.RetrieveUpdateAPIView):
    queryset = Food.objects.all()
    serializer_class = MatchSerializer

class MatchView(generics.RetrieveAPIView):
    """
    A View that returns random match.
    """
    queryset = Food.objects.all()
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        count = Food.objects.all().count()
        import random
        random_row = random.randint(1, count)
        match = Food.objects.get(id=random_row)
        return Response({'match': match}, template_name='match.html')

class NextGame(generics.RetrieveAPIView):
    queryset = Food.objects.all()
    serializer_class = MatchSerializer

    def get(self, request, *args, **kwargs):
        count = Food.objects.all().count()
        import random
        random_row = random.randint(1, count)
        print(random_row)
        match = Food.objects.get(id=random_row)
        serializer = MatchSerializer(match)
        return Response(serializer.data)

class FacebookUserView(generics.CreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FacebookUserSerializer