from django.db import models

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    year = models.IntegerField()
    author = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    title = models.TextField()
    synopsis = models.TextField()
    genre = models.CharField(default = "Comedy", max_length= 15)

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, default="dn")

class Borrow(models.Model):
    cust = models.ForeignKey(Customer, on_delete=models.CASCADE)
    books = models.ForeignKey(Book, on_delete=models.CASCADE)
    due_date = models.DateField()
    is_returned = models.BooleanField(default=False)

