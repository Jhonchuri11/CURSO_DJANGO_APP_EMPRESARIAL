from django.shortcuts import render
from django.http import JsonResponse
from .models import Empleado
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, generics
from .serializers import EmpleadoSerializer

class EmpleadoCalcular(generics.CreateAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class EmpleadoList(generics.ListAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

@csrf_exempt
def calcular_pago(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        categoria = request.POST.get('categoria')
        horasTrabajadas = float(request.POST.get('horasTrabajadas'))

        # Verifica que los campos requeridos no estén ausentes
        if nombre is None or categoria is None or horasTrabajadas is None:
            return JsonResponse({'error': 'Campos requeridos no presentes en la solicitud'})

        # Convierte 'horas_trabajadas' a un número flotante
        try:
            horasTrabajadas = float(horasTrabajadas)
        except ValueError:
            return JsonResponse({'error': 'El valor de "horas_trabajadas" no es un número válido'})

        # Lógica para calcular el pago según la categoría
        if categoria in ['A', 'B', 'C']:
            if categoria == 'A':
                pago = horasTrabajadas * 30
            elif categoria == 'B':
                pago = horasTrabajadas * 20
            else:  # Aquí ya estamos seguros de que categoria es 'C'
                pago = horasTrabajadas* 10

            # Actualizar el campo pago antes de almacenar los datos en la base de datos
            empleado = Empleado.objects.create(nombre=nombre, categoria=categoria, horasTrabajadas=horasTrabajadas, pago=pago)
            return JsonResponse({'nombre': nombre, 'categoria': categoria, 'horasTrabajadas': horasTrabajadas, 'pago': pago})
        else:
            return JsonResponse({'error': 'Categoría no válida'})

    return JsonResponse({'error': 'Método no permitido'})


@csrf_exempt
def calcular_pagos(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        categoria = request.POST.get('categoria')
        horasTrabajadas = request.POST.get('horasTrabajadas')
        pago = request.POST.get('pago')

        # Verificar si todos los campos están presentes
        if nombre is None or categoria is None or horasTrabajadas is None or pago is None:
            return JsonResponse({'error': 'Campos requeridos no presentes en la solicitud'}, status=400)


        # Lógica para calcular el pago según la categoría
        if categoria in ['A', 'B', 'C']:
            if categoria == 'A':
                pago_calculado = horasTrabajadas * 30
            elif categoria == 'B':
                pago_calculado = horasTrabajadas * 20
            else:  # Aquí ya estamos seguros de que categoria es 'C'
                pago_calculado = horasTrabajadas * 10

            # Verificar si el pago calculado coincide con el valor proporcionado
            if pago != pago_calculado:
                return JsonResponse({'error': 'El valor proporcionado para "pago" no coincide con el cálculo'}, status=400)

            # Actualizar el campo pago antes de almacenar los datos en la base de datos
            empleado = Empleado.objects.create(nombre=nombre, categoria=categoria, horasTrabajadas=horasTrabajadas, pago=pago)
            return JsonResponse({'nombre': nombre, 'categoria': categoria, 'horasTrabajadas': horasTrabajadas, 'pago': pago})

        else:
            return JsonResponse({'error': 'Categoría no válida'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

