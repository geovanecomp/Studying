from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Games
from .serializers import GamesSerializer

def index(request):
    games = Games.objects.all()
    return render(request, "homepage/index.html", {'games': games})

def games(request):
    games = serialize('json', Games.objects.all())
    return HttpResponse(games, content_type='application/json')


class GamesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows games to be viewed or edited.
    """
    queryset = Games.objects.all()
    serializer_class = GamesSerializer
