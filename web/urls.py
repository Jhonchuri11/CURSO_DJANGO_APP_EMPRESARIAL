from django.urls import path

from . import views

app_name = 'web'

urlpatterns = [
     path('', views.AlumnoView.as_view(), name='index'),
     path('eliminarAlumno/<alumno_id>/', views.AlumnoView.deleteAlum, name='eliminarAlumno'),
     path('editarAlumno/<int:alumno_id>/', views.AlumnoView.editarAlumno, name='editarAlumno'),
     path('profesor', views.ProfesorView.as_view(), name='profesor'),
     path('eliminarProfesor/<profesor_id>/', views.ProfesorView.deleteProfesor, name='eliminarProfesor'),
     
     
]