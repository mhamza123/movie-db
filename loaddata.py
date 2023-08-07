# load_data.py
import os
import json
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Testing.settings")
django.setup()

from backend.models import Movie, Reviews, User

def load_data():
    with open('movie/data/movie-db.json') as file:
        data = json.load(file)

        # Load Movie data
        for movie_data in data['movie']:
            Movie.objects.create(
                name=movie_data['name'],
                Description=movie_data['Description'],  # Changed 'Description' to 'text'
                release=movie_data['release'],
                duration=movie_data['duration'],
                img=movie_data['img'],
                id=movie_data['id']
            )

        # Load Review data
        for review_data in data['reviews']:
          #  user = User.objects.get(username=review_data['username'])
            Reviews.objects.create(
                id=review_data['id'],
                text=review_data['text'],
                star=review_data['star'],
                username=review_data['username'],
            )

if __name__ == '__main__':
    load_data()
