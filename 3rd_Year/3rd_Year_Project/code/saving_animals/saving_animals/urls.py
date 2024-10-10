from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('accounts/', include('accounts.urls')),
    path('profile/', include('user_profile.urls')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='base.html'))] 