from django.contrib import admin

# Register your models here.
from .models import Categoria, Producto, Talla, ImagenProducto
class ImagenProductoAdmin(admin.TabularInline):
    model = ImagenProducto

class ProductoAdmin(admin.ModelAdmin):
    list_display = ["categoria", "nombre", "precio"]
 
    inlines = [
        ImagenProductoAdmin
    ]

admin.site.register(Categoria)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Talla)