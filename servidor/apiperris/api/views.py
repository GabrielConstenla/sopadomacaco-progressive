from django.shortcuts import render

# Create your views here.

from .models import Perros
from rest_framework import viewsets
from api.serializers import PerrosSerializer


class PerrosViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Perros.objects.all()
    serializer_class = PerrosSerializer
