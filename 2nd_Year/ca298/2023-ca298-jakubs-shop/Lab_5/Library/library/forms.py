from django.shortcuts import get_object_or_404
from django import forms
from .models import *
from datetime import datetime

class BookForm(forms.ModelForm):
    class Meta:
        model = Book

        fields = ["year", "author", "price", "title", "synopsis", "genre"]
    
    def clean(self):
        data = self.cleaned_data
        year = data["year"]
        author = data["author"]
        price = data["price"]
        title = data["title"]
        synopsis = data["synopsis"]
        genre = data["genre"]

        current_date = datetime.now()
        this_year = current_date.year
        book_exists = Book.objects.filter(title=title).exists()
        if year > this_year:
            raise forms.ValidationError("You can't add a book from the future")
        
        if book_exists:
            raise forms.ValidationError("A book named {} already exists".format(title))
        else:
            return data
        