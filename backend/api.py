import requests
from bs4 import BeautifulSoup
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie
import os, re

class ScrapeMovieDetails(APIView):
    def get(self, request):
        movie_name = request.query_params.get('movie_name', '')
        if movie_name:
            movie_details = self.scrape_movie(movie_name)
            return Response(movie_details)
        else:
            return Response({'error': 'Movie name not provided'})

    def scrape_movie(self, movie_name):
        search_url = "https://www.imdb.com/find/?q=" + movie_name
        imdburl = "https://www.imdb.com/"
        params = {
            "q": movie_name,
            "ref": "nv_sr_sm", 
        }
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", 
            "X-Amzn-Trace-Id": "Root=1-61acac03-6279b8a6274777eb44d81aae", 
            "X-Client-Data": "CJW2yQEIpLbJAQjEtskBCKmdygEIuevKAQjr8ssBCOaEzAEItoXMAQjLicwBCKyOzAEI3I7MARiOnssB" }

        response = requests.get(search_url, headers = headers)
        #print(response)
        soup = BeautifulSoup(response.content, "html.parser")

        anchor_tag = soup.find('a', class_='ipc-metadata-list-summary-item__t')
        #print(anchor_tag)
        if anchor_tag:
            href_value = anchor_tag.get('href')
            print(href_value)
        else:
            print("Anchor tag not found.")

        movieurl = imdburl + href_value

        response = requests.get(movieurl, headers = headers)
        soup = BeautifulSoup(response.content, "html.parser")
        descriptiontag = soup.find('span', class_='sc-466bb6c-0')
        ratingtag = soup.find('span', class_='sc-bde20123-1')
        imagetag = soup.find('img', class_='ipc-image')
        durationtag = soup.find('div', class_='sc-acac9414-0')
        title = soup.find('span', class_='sc-afe43def-1')
        url = imagetag.get('src')
        #print(url)
        name = title.text
        Description = descriptiontag.text
        star = ratingtag.text 
        duration = durationtag.text[-6:]
        img = url
        release = durationtag.text[len(title.text):len(title.text) + 4]
        namee = name.replace(':', '')

        movie = Movie.objects.create(
        name=name,
        Description=Description,
        duration=duration,
        release=release,
        img = '/movie-img/' + namee + '.jpg',
        )

        image_response = requests.get(url)
        if image_response.status_code == 200:
            image_content = image_response.content

            image_filename = f"{title.text}"

            if not image_filename.lower().endswith('.jpg'):
                image_filename += '.jpg'

            clean_filename = re.sub(r'[<>:"/\\|?*]', '', image_filename)
            image_path = os.path.join('../movie/static/movie-img', clean_filename)  

            current_directory = os.path.dirname(os.path.abspath(__file__))
            image_full_path = os.path.join(current_directory, image_path)

            with open(image_full_path, 'wb') as image_file:
                image_file.write(image_content)
        return {
            'name': name,
            'Description': Description,
           # 'img': img,
            'duration': duration,
            'release': release,
            'img': '/movie-img/' + namee + '.jpg',
        }