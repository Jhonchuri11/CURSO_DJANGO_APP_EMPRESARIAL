from rest_framework import serializers
from .models import Curso, Semestre

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id','semestreId','titulo','descripcion']

class SemestreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semestre
        fields = ['id','nombre']


