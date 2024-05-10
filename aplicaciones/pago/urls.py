from django.urls import path

from .import views

app_name = 'plantilla'

urlpatterns = [
    path('', views.index, name="index"),
    path('salir/', views.salir, name="salir"),
    path('resultado', views.pago, name="pago"),
]