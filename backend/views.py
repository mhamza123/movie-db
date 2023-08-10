# backend/views.py
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Movie, User, Reviews    
from django.contrib.auth.models import User
from .serializers import MovieSerializer, UserSerializer, ReviewSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate, login, logout
from bs4 import BeautifulSoup
import requests
import json

from django.http import JsonResponse
    
@api_view(['GET'])
def movie_list(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def review_list(request):
    reviews = Reviews.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = User.objects.filter(username=username).first()

    if user is not None and user.check_password(password):
        return Response({'authenticated': True})
    else:
        return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    request.session.flush()

    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_review(request, movie_id):
        movie_id = int(movie_id)
        data = request.data
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Review Created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_movie_by_id(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
        data = {
            'id': movie.id,
            'name': movie.name,
            'description': movie.Description,
            'release': movie.release,
            'duration': movie.duration,
            'img': movie.img,
        }
        return JsonResponse(data)
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=404)    

class MyTokenObtainPairView(TokenObtainPairView):
    
    pass


