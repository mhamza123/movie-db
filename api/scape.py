import requests
import time
from bs4 import BeautifulSoup
from os.path import basename
import os, re
#from django.conf.urls.static import static
from django.templatetags.static import static
from django.conf import settings

inputname = input("Enter the name of the movie: ")
# IMDb search URL
search_url = "https://www.imdb.com/find/?q=" + inputname
imdburl = "https://www.imdb.com/"

# Your search parameter

# Prepare the query parameters
params = {
    "q": inputname,
    "ref": "nv_sr_sm",  # This ref parameter corresponds to the default search option on IMDb
}
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", 
    "X-Amzn-Trace-Id": "Root=1-61acac03-6279b8a6274777eb44d81aae", 
    "X-Client-Data": "CJW2yQEIpLbJAQjEtskBCKmdygEIuevKAQjr8ssBCOaEzAEItoXMAQjLicwBCKyOzAEI3I7MARiOnssB" }

# Make the HTTP request to fetch the search results page
response = requests.get(search_url, headers = headers)
#print(response)
# Parse the HTML content using BeautifulSoup
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
lnk = url
print(title.text)
print(descriptiontag.text)
print(ratingtag.text)
print(durationtag.text[-6:])
print(durationtag.text[len(title.text):len(title.text) + 4])
#print(durationtag.text[-15:-11])
#print(durationtag.text[:-15])
print(url)
if url:
    image_response = requests.get(url)
    if image_response.status_code == 200:
        image_content = image_response.content

        image_filename = f"{title.text}"
        
        # Ensure the image filename ends with .jpg
        if not image_filename.lower().endswith('.jpg'):
            image_filename += '.jpg'

        # Clean the filename to remove invalid characters for filenames
        clean_filename = re.sub(r'[<>:"/\\|?*]', '', image_filename)
        image_path = os.path.join('movie-img', clean_filename)  # Use the cleaned filename
        
        # Save the image in the current directory or another directory of your choice
        current_directory = os.path.dirname(os.path.abspath(__file__))
        image_full_path = os.path.join(current_directory, image_path)

        with open(image_full_path, 'wb') as image_file:
            image_file.write(image_content)

        # Print the extracted details
        print(title.text)
        print(descriptiontag.text)
        print(ratingtag.text)
        print(durationtag.text[-6:])
        print(durationtag.text[len(title.text):len(title.text) + 4])
        print(f"Image saved as: {image_path}")
   
else:
    print("Image URL not found")



