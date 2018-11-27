from .models import Perro
from rest_framework import serializers


class PerrosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Perro
        fields = ( 'id','fotografiaUrl', 'nombre', 'raza', 'descripcion', 'estado')
