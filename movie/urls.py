from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('login', index),
    path('movie/<int:id>', index),
]
