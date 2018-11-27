# esto era otra cosa según tutorial.
from .models import Perros
from rest_framework import serializers


class PerrosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Perros
        fields = ( 'id','fotografiaUrl', 'nombre', 'raza', 'descripcion', 'estado')
