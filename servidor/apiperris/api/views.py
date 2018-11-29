from django.shortcuts import render

# Create your views here.

from .models import Perro
from rest_framework import viewsets
from api.serializers import PerrosSerializer


class PerrosViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Perro.objects.all()

    serializer_class = PerrosSerializer


#Ejemplo extra, hice este porque era el que tenía mas filtros
class GaleriaViewSet(viewsets.ModelViewSet):
    queryset = Perro.objects.filter(estado__contains='Disponible')
    queryset2 = Perro.objects.filter(estado__contains='Rescatado')
    queryset3 = Perro.objects.filter(estado__contains='Perro')

    serializer_class = PerrosSerializer
