from django.db import models

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    year = models.IntegerField()
    author = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    title = models.TextField()
    synopsis = models.TextField()
    category = models.CharField(default = "Comedy", max_length= 15)
