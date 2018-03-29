from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from rest_framework.renderers import TemplateHTMLRenderer

from rest_framework import generics
from rest_framework.response import Response

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

class UserDetail(generics.RetrieveAPIView):
    queryset = Match.objects.all()
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        return Response({'user': self.object}, template_name='user_detail.html')

class Vote(generics.RetrieveUpdateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

class MatchView(generics.RetrieveAPIView):
    """
    A View that returns random match.
    """
    queryset = Match.objects.all()
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        count = Match.objects.all().count()
        import random
        random_row = random.randint(1, count)
        print(random_row)
        match = Match.objects.get(id=random_row)
        return Response({'match': match}, template_name='match.html')
