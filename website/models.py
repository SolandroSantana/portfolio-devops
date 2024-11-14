from django.db import models

# Create your models here.

class ElementoTabelaPeriodica(models.Model):
    id = models.AutoField(primary_key=True)
    simbolo = models.CharField(max_length=5)
    numero_atomico = models.IntegerField()
    nome = models.CharField(max_length=100)
    massa_atomica = models.DecimalField(max_digits=10, decimal_places=5)
    propriedades = models.TextField(blank=True, null=True)
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome