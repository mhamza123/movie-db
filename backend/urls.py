# backend/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('api/movies/', views.movie_list, name='movie-list'),
    # Add other URL patterns if needed
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/register/', views.register_view, name='register'),
    path('api/reviews/', views.review_list),
    path('api/movies/<int:movie_id>/', views.get_movie_by_id),
    path('api/movies/<int:movie_id>/add-reviews/', views.create_review, name='create_review'),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/add-movie/', views.add_movie, name='add_movie'),
]
