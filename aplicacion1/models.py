from django.db import models

# Create your models here.

class Categoria(models.Model):
    nombre = models.CharField(max_length=250)
    #Colocando 
    fecha = models.DateTimeField("fecha de registro", auto_now=True)

    def __str__(self):
        return self.nombre
    
class Talla(models.Model):
    nombre = models.CharField(max_length=2, unique=True)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=250)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField(default=0)
    tallas = models.ManyToManyField(Talla)
    pub_date = models.DateTimeField('date published')
    imagen = models.ImageField(upload_to="productos", null=True)
    detalle = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

class ImagenProducto(models.Model):
    imagen = models.ImageField(upload_to="productos")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="imagenes")