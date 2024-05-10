from django.urls import path
from .views import listaCursos, FiltrarCursoSemestre, ListSemestres, crearCurso

urlpatterns = [
    path('listCursos/', listaCursos.as_view(), name='Lista de Cursos'),
    path('curso/semestre/<int:semestre_id>/', FiltrarCursoSemestre.as_view(), name='Cursos por semestre'), 
    path('listSemestres/', ListSemestres.as_view(), name='List Semestres'),   
    path('crearCurso/', crearCurso.as_view(), name='crear curso'),
]