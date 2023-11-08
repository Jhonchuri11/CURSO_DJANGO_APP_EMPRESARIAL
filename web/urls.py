from django.urls import path

from web import views

app_name = 'web'

urlpatterns = [
     path('', views.AlumnoView.as_view(), name='index'),
     path('eliminarAlumno/<alumno_id>/', views.AlumnoView.deleteAlum, name='eliminarAlumno'),
     
     path('profesor', views.ProfesorView.as_view(), name='profesor'),
     path('eliminarProfesor/<profesor_id>/', views.ProfesorView.deleteProfesor, name='eliminarProfesor'),
     
     
]