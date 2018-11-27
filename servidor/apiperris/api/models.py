from django.db import models

# Create your models here.

ESTADO = (
        ('ADOPTADO','ADOPTADO'),
        ('RESCATADO', 'RESCATADO'),
        ('DISPONIBLE','DISPONIBLE'),
    )

class Perro(models.Model):
    id = models.AutoField(primary_key = True)
    fotografiaUrl = models.CharField( max_length = 255, default = '' )
    nombre = models.CharField(max_length=50)
    raza = models.CharField(max_length=30)
    descripcion = models.TextField()
    estado = models.CharField(max_length=10, choices=ESTADO)
    def __str__(self):
    	return self.nombre
