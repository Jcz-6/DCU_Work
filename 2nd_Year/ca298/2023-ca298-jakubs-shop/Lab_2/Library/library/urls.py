from .views import *
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('books', view_all_books, name="all_books"),
    path('books/<int:bookid>', view_single_book, name="single_book"),
    path('books/year/<int:year>', view_books_by_year, name="books_by_year"),
    path('books/category/<str:category>', view_books_by_cat, name="books_by_cat"),
    path('books/category/<str:category>/year/<int:year>', view_books_by_cat_year, name="books_by_cat_year")
]
