from rest_framework.serializers import ModelSerializer
from aplicacion1.models import Post

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','titulo']

