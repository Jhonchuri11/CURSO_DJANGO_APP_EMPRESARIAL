from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
# Create your views here.

def index(request):
    return render(request, 'plantilla/principal.html')

def salir(request):
    logout(request)
    return redirect('/')

def pago(request):
    hora_trabajada = int(request.POST['valor1'])
    pago_hora = int(request.POST['valor2'])
    numero_hijo = int(request.POST['valor3'])

    if hora_trabajada <= 48:
        pago_semanal_normal = pago_hora * hora_trabajada
        descuento = pago_semanal_normal * 0.08
        bonificacion = numero_hijo * 50
        pago_final = (pago_semanal_normal - descuento) + bonificacion
    else:
        horas_normal = 48
        hora_extra = hora_trabajada - horas_normal
        pago_semanal_normal = pago_hora * hora_trabajada
        bonificacion = numero_hijo * 50
        pago_semanal_extra = pago_semanal_normal  + (hora_extra * pago_hora * 2)
        descuento = pago_semanal_extra * 0.08
        pago_final = (pago_semanal_extra - descuento) + bonificacion

    context = {
        'valor1': hora_trabajada,
        'valor2': pago_hora,
        'valor3': numero_hijo,
        'resultado': pago_final,
    }
    return render(request, 'plantilla/resultado.html', context)
