from django.db import models

# Create your models here.

class MenuItem(models.Model):
    title = models.CharField(max_length=200)
    cost = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title