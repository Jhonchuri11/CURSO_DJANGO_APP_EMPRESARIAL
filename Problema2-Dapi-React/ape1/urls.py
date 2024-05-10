from django.urls import path
from .views import calcular_pago, calcular_pagos, EmpleadoCalcular, EmpleadoList

urlpatterns = [
    path('calcular_pago/', calcular_pago, name='calcular_pago'),
    path('calcular_pagos/', calcular_pagos, name='calcular_pagos'),
    path('empleado/', EmpleadoCalcular.as_view(), name='empleado'),
    path('empleados/', EmpleadoList.as_view(), name='empleados')
    
]