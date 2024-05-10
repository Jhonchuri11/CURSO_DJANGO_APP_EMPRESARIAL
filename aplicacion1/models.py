from django.db import models

# Xreacion de modelos

class Post(models.Model):
    titulo = models.CharField(max_length=100)
    contenido = models.TextField
