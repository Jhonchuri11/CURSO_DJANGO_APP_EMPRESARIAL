from django.shortcuts import render

# Create your views here.
from .models import Producto, Categoria

def index(request):
    product_list = Producto.objects.order_by('nombre')
    categoria_list = Categoria.objects.order_by('nombre')
    context = {
        'product_list': product_list,
        'categoria_list': categoria_list
    }
    return render(request, 'index.html', context)

def producto_detalle(request, producto_id):
    producto = Producto.objects.get(id=producto_id)
    return render(request, 'detalle.html', {'producto': producto})

def detalle_categoria(request, categoria_id):
    categoria = Categoria.objects.get(id = categoria_id)
    productos = Producto.objects.filter(categoria = categoria)

    return render(request, 'detalle_categoria.html', {'categoria': categoria, 'productos': productos})



