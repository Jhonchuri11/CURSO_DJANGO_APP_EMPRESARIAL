from .models import Curso, Semestre
from rest_framework import generics
from .serializers import CursoSerializer, SemestreSerializer

# Vista par mostrrar todos los cursos
class listaCursos(generics.ListAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class crearCurso(generics.CreateAPIView): 
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

# Vista que filtra los cursos por semestre
class FiltrarCursoSemestre(generics.ListAPIView):
    serializer_class = CursoSerializer

    def get_queryset(self):
        semestre_id = self.kwargs['semestre_id']
        return Curso.objects.filter(semestreId__id=semestre_id)
    
class ListSemestres(generics.ListAPIView):
    queryset = Semestre.objects.all()
    serializer_class = SemestreSerializer