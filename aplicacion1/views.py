from django.shortcuts import render

# Create your views here.
from .models import Producto, Categoria, ImagenProducto

def index(request):
    product_list = Producto.objects.order_by('nombre')
    categoria_list = Categoria.objects.order_by('nombre')
    imagen_list = ImagenProducto.objects.all()[:3]
    context = {
        'product_list': product_list,
        'categoria_list': categoria_list,
        'imagen_list': imagen_list
    }
    return render(request, 'index.html', context)

def producto_detalle(request, producto_id):
    producto = Producto.objects.get(id=producto_id)
    imagenes = ImagenProducto.objects.filter(producto=producto)

    context = {
        'producto': producto,
        'imagenes': imagenes
    }
    return render(request, 'detalle.html', context)

def detalle_categoria(request, categoria_id):
    categoria = Categoria.objects.get(id = categoria_id)
    productos = Producto.objects.filter(categoria = categoria)
    imagen_list = ImagenProducto.objects.all()[:3]

    return render(request, 'detalle_categoria.html', {'categoria': categoria, 'productos': productos, 'imagen_list': imagen_list})

def negocio(request):
    return render(request, 'negocio.html')