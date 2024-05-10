from rest_framework.routers import DefaultRouter
from aplicacion1.api.views import PostApiView

router_post = DefaultRouter()
router_post.register(prefix='aplicacion1', basename='aplicacion1', viewset=PostApiView)