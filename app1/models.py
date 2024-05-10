from typing import Any
from django.db import models

# Create your models here.
class Prueba(models.Model):
    codigo_alumno = models.IntegerField()
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    puntaje = models.CharField(max_length=20)

    def __init__(self):
        return self.nombres