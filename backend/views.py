# backend/views.py
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
from .models import Movie, User, Reviews    
from django.contrib.auth.models import User
from .serializers import MovieSerializer, UserSerializer, ReviewSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate, login, logout
from bs4 import BeautifulSoup
import requests
import json
# backend/views.py

from django.http import JsonResponse

# def save_new_movie(name, description, release, duration, img):
#     # Create a new movie object and save it to MongoDB
#     new_movie = Movie(name=name, description=description, release=release, duration=duration, img=img)
#     new_movie.save()

    
# def save_movie(request):
#     # Create a new movie object and save it to MongoDB
#     new_movie = Movie(name='The Godfather', description='...', release=1972, duration='2h 55min', img='./movie-img/the-god-father.png')
#     new_movie.save()

#     # You can redirect to another page or return an appropriate response
#     return render(request, 'movie_saved.html')


# def get_movies(request):
#     # Get all movies from MongoDB
#     all_movies = Movie.objects.all()
#     return render(request, 'movies_list.html', {'movies': all_movies})

# class MovieList(APIView):
#     def get(self, request):
#         movies = Movie.objects.all()
#         serializer = MovieSerializer(movies, many=True)
#         return Response(serializer.data)
    
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
        # You can set a session variable here if needed
        return Response({'authenticated': True})
    else:
        return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    # Perform any necessary logout actions here, such as clearing session data or tokens
    # For example, you can clear the user's session by calling 
    request.session.flush()

    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    # You can set a session variable here if needed
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_review(request, movie_id):
        movie_id = int(movie_id)
    # Extract the review data from the request body
    # try:
        # Check if the movie exists
        # if not Movie.objects.filter(id=movie_id).exists():
        #     return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)

        # Extract review data from the request
        data = request.data
        # data['movie_id'] = movie_id

        # Serialize and validate the review data
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            # Save the review to the database
            serializer.save()
            return Response({'message': "Review Created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # except Exception as e:
    #     return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Return a success response
    # return JsonResponse({'message': 'Review created successfully'}, status=201)

def get_movie_by_id(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
        # Serialize movie data to JSON and return it
        data = {
            'id': movie.id,
            'name': movie.name,
            'description': movie.Description,
            'release': movie.release,
            'duration': movie.duration,
            'img': movie.img,
            # Add other fields as needed
        }
        return JsonResponse(data)
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=404)
    
    


class MyTokenObtainPairView(TokenObtainPairView):
    # Custom logic if needed
    pass



def add_movie(request):
    
    if request.method == 'POST':
        inputname = request.POST.get('movieName')
        # IMDb search URL
        search_url = "https://www.imdb.com/find/?q=" + inputname
        imdburl = "https://www.imdb.com/"

        # Your search parameter

        # Prepare the query parameters
        params = {
            "q": inputname,
            "ref": "nv_sr_sm",  # This ref parameter corresponds to the default search option on IMDb
        }
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "X-Amzn-Trace-Id": "Root=1-61acac03-6279b8a6274777eb44d81aae",
            "X-Client-Data": "CJW2yQEIpLbJAQjEtskBCKmdygEIuevKAQjr8ssBCOaEzAEItoXMAQjLicwBCKyOzAEI3I7MARiOnssB"
        }

        # Make the HTTP request to fetch the search results page
        response = requests.get(search_url, headers=headers)

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, "html.parser")

        anchor_tag = soup.find('a', class_='ipc-metadata-list-summary-item__t')
        if anchor_tag:
            href_value = anchor_tag.get('href')
        else:
            return JsonResponse({'error': 'Movie not found'}, status=404)

        movieurl = imdburl + href_value

        response = requests.get(movieurl, headers=headers)
        soup = BeautifulSoup(response.content, "html.parser")
        descriptiontag = soup.find('span', class_='sc-466bb6c-0')
        ratingtag = soup.find('span', class_='sc-bde20123-1')
        imagetag = soup.find('img', class_='ipc-image')
        url = imagetag.get('src')
        description = descriptiontag.text if descriptiontag else ""
        rating = ratingtag.text if ratingtag else ""

        movie_data = {
            "name": inputname,
            "Description": descriptiontag.text,
            "release": ratingtag.text,
            "img": url
        }

        movie_data_json = json.dumps(movie_data)
        return movie_data_json

        # Save the movie details to the database
        # movie = Movie.objects.create(name=inputname, description=description, rating=rating, image_url=url)
        # return JsonResponse({'message': 'Movie added successfully!', 'movie_id': movie.id}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


