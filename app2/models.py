from django.db import models
# creacion de modelo semestre y curso 

class Semestre(models.Model):
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre

class Curso(models.Model):
    semestreId = models.ForeignKey(Semestre, on_delete= models.CASCADE)
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()

    def __str__(self):
        return self.titulo