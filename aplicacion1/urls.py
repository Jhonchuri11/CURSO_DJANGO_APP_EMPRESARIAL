from django.urls import path
from .import views

app_name = 'calzados'

urlpatterns = [
    path('', views.index, name='index'),
    path('producto/<int:producto_id>/', views.producto_detalle, name='producto'),
    path('categoria/<int:categoria_id>/', views.detalle_categoria, name='categoria')
]