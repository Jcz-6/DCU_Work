from django.shortcuts import render, get_object_or_404
from .models import *
from .forms import *
from django.http import JsonResponse
from rest_framework import viewsets
from .serializers import *
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

def add_book(request):
    if request.method == "POST":
        form = BookForm(request.POST)
        
        if form.is_valid():
            emp = form.save()

            return render(request, "added_book.html", {"emp": emp})
        
        else:
            return render(request, "add_book.html", {"form": form})
    
    else:
        form = BookForm()
        return render(request, "add_book.html", {"form": form})

def edit_book(request, bookid):
    book = get_object_or_404(Book, id=bookid)
    form = BookForm(instance=book)
    return render(request, "add_book.html", {"form": form})

def api_add(request):
    num1 = float(request.GET.get('num1',1))
    num2 = float(request.GET.get('num2',2))
    added = num1 + num2

    resp_dict = {'result':added}
    return JsonResponse(resp_dict)

def api_add(request):
    num1 = float(request.GET.get('num1',1))
    num2 = float(request.GET.get('num2',2))
    added = num1 + num2

    resp_dict = {'result':added}
    return JsonResponse(resp_dict)

def api_subtract(request):
    num1 = float(request.GET.get('num1',1))
    num2 = float(request.GET.get('num2',2))
    subtracted = num1 + num2

    resp_dict = {'result':subtracted}
    return JsonResponse(resp_dict)

def api_divide(request):
    num1 = float(request.GET.get('num1',1))
    num2 = float(request.GET.get('num2',2))
    divided = num1 + num2

    resp_dict = {'result':divided}
    return JsonResponse(resp_dict)

def api_multiply(request):
    num1 = float(request.GET.get('num1',1))
    num2 = float(request.GET.get('num2',2))
    multiplied = num1 + num2

    resp_dict = {'result':multiplied}
    return JsonResponse(resp_dict)

def api_exponential(request):
    num1 = float(request.GET.get('num1',1))
    num2 = float(request.GET.get('num2',2))
    exponent = num1 + num2

    resp_dict = {'result':exponent}
    return JsonResponse(resp_dict)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all() 
    serializer_class = CustomerSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BooksSerializer

class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
