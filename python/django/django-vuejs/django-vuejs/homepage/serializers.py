from .models import Games
from rest_framework import serializers

class GamesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Games
        fields = ('titulo', 'plataformas')
