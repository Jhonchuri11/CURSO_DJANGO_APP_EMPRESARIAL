from django.db import models

class Empleado(models.Model):
    nombre = models.CharField(max_length=200)
    categoria = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C')])
    horasTrabajadas = models.IntegerField()
    pago = models.FloatField()

    