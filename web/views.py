from django.shortcuts import render, redirect, get_object_or_404


# importamos la clase View
from django.views import View
from .models import *
from .forms import *
from django.contrib import messages

# Create your views here.
class AlumnoView(View):
    
    def get(self,request):
        listaAlumnos = TblAlumno.objects.all()
        formAlumno = AlumnoForm()
        context = {
            'alumnos' : listaAlumnos,
            'formAlumno': formAlumno
        }
        return render(request,'index.html',context)

    def post(self, request):
        formAlumno = AlumnoForm(request.POST)
        if formAlumno.is_valid():
            formAlumno.save()
            return redirect('/')
        
    def deleteAlum(request, alumno_id):
        Alumno = get_object_or_404(TblAlumno, alumno_id=alumno_id)
        Alumno.delete()
        return redirect('/')
    
    def editarAlumno(request, alumno_id):
        alumno = get_object_or_404(TblAlumno, alumno_id=alumno_id)
        data = {
            'form' : AlumnoForm(instance=alumno)
        }
        return render(request, 'editar_alumno.html', data)
        
    
class ProfesorView(View):

    def get(self,request):
        listProfesores = TblProfesor.objects.all()
        formProfesor = ProfesorForm()
        context = {
            'profesores': listProfesores,
            'formProfesor': formProfesor
        }
        return render(request, 'profesores.html', context)
    
    def post(self, request):
        formProfesor = ProfesorForm(request.POST)
        if formProfesor.is_valid():
            formProfesor.save()
            return redirect('/profesor')
    def deleteProfesor(request, profesor_id):
        profesor = get_object_or_404(TblProfesor, profesor_id=profesor_id)
        profesor.delete()
        return redirect('/profesor')
