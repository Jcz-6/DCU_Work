from .views import *
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('books', view_all_books, name="all_books"),
    path('books/<int:bookid>', view_single_book, name="single_book"),
    path('books/year/<int:year>', view_books_by_year, name="books_by_year"),
    path('books/genre/<str:genre>', view_books_by_cat, name="books_by_cat"),
    path('books/genre/<str:genre>/year/<int:year>', view_books_by_cat_year, name="books_by_cat_year"),
    path('books/customer_loans/<int:id>', get_cust_books, name="cust_books"),
    path('books/customer/<int:id>', view_customer, name="single_customer"),
    path('books/add_book', add_book, name="add_book"),
    path('books/add_book/<int:bookid>', edit_book, name="edit_book")

]
