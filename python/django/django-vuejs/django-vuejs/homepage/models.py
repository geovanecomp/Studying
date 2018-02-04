from django.db import models

# Create your models here.
class Games(models.Model):
    titulo = models.CharField(max_length=255)
    plataformas = models.CharField(max_length=255)
