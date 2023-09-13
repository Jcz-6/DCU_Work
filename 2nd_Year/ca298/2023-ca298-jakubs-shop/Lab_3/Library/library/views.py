from django.shortcuts import render, get_object_or_404


from .models import *
# Create your views here.

def view_all_books(request):
    all_books = Book.objects.all()
    return render(request, 'all_books.html', {'books':all_books})

def view_single_book(request, bookid):
    single_book = get_object_or_404(Book, id=bookid)
    customers = Borrow.objects.filter(books=single_book)
    return render(request, 'single_book.html', {'customers':customers, 'book':single_book})

def view_books_by_year(request, year):
    books_year = Book.objects.filter(year=year)
    return render(request, 'all_books.html', {'books':books_year})

def view_books_by_cat(request, genre):
    books_cat = Book.objects.filter(genre=genre)
    return render(request, 'all_books.html', {'books':books_cat})

def view_books_by_cat_year(request, genre, year):
    books_cat_year = Book.objects.filter(genre=genre, year=year)
    return render(request, 'all_books.html', {'books':books_cat_year})

def get_cust_books(request, id):
    cust = Customer.objects.get(id=id)
    borrowings = Borrow.objects.filter(cust = cust)
    return render (request, "all_books_cust.html", {'borrowings':borrowings})

def view_customer(request, id):
    cust = Customer.objects.get(id=id)
    returned = Borrow.objects.filter(cust=cust, is_returned=True)
    not_returned = Borrow.objects.filter(cust=cust, is_returned=False)
    return render (request, "single_customer.html", {'returned':returned,'not_returned':not_returned,'cust':cust})
