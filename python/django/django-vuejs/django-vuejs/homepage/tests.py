from django.test import TestCase
from .models import Games

class GamesTestCase(TestCase):
    def setUp(self):
        Games.objects.create(titulo='test_title', plataformas='test_plat')
        Games.objects.create(titulo='test_title2', plataformas='test_plat2')

    def test_games_should_have_title(self):
        """All games must have the title information"""

        game1 = Games.objects.get(titulo='test_title')
        self.hasattr(game1, 'titulo')
