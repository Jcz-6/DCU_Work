from django.shortcuts import render, get_object_or_404


from .models import *
# Create your views here.

def view_all_books(request):
    all_books = Book.objects.all()
    return render(request, 'all_books.html', {'books':all_books})

def view_single_book(request, bookid):
    single_book = get_object_or_404(Book, id=bookid)
    return render(request, 'single_book.html', {'book':single_book})

def view_books_by_year(request, year):
    books_year = Book.objects.filter(year=year)
    return render(request, 'all_books.html', {'books':books_year})

def view_books_by_cat(request, category):
    books_cat = Book.objects.filter(category=category)
    return render(request, 'all_books.html', {'books':books_cat})

def view_books_by_cat_year(request, category, year):
    books_cat_year = Book.objects.filter(category=category, year=year)
    return render(request, 'all_books.html', {'books':books_cat_year})
