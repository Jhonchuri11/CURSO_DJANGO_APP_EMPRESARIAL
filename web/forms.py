from django.forms import ModelForm
from .models import *


class AlumnoForm(ModelForm):
    class Meta:
        model = TblAlumno
        fields = '__all__'

class ProfesorForm(ModelForm):
    class Meta:
        model = TblProfesor
        fields = '__all__'
    
