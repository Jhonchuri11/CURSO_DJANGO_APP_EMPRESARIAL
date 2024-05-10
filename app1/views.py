from django.shortcuts import render
from .models import Prueba


# Create your views here.

def index(request):
    lista_prueba = Prueba.objects.all()
    context = {
        'list': lista_prueba
    }
    return render(request, 'index.html', context)