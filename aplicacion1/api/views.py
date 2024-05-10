from rest_framework.viewsets import ModelViewSet
from aplicacion1.models import Post
from aplicacion1.api.serializers import PostSerializer

class PostApiView(ModelViewSet):
    
    # Creamos un serializador  | Indica los datos de la tabla 
    # Todos los datos de la base de datos
    serializer_class = PostSerializer
    queryset = Post.objects.all()


    



