
from django.urls import path
from .views import SignupView, GetCSRFToken, LoginView, LogoutView, CheckAuthenticated, DeleteAccountView, GetUserView


urlpatterns = [
    path('register', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('authenticated', CheckAuthenticated.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('get_users', GetUserView.as_view()),
]