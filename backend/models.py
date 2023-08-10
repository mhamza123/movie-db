from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=100)
    Description = models.TextField()
    release = models.CharField(max_length=4)
    duration = models.CharField(max_length=10)
    img = models.CharField(max_length=100)
    id = models.AutoField(auto_created=True, primary_key=True)

    def __str__(self):
        return self.name
    

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    favorites = models.ManyToManyField(Movie, related_name='favorited_by')

class Reviews(models.Model):
    # id = models.PositiveIntegerField(primary_key=True)
    movie_id = models.PositiveIntegerField()
    text = models.TextField()
    star = models.PositiveIntegerField()
    username = models.CharField(max_length=100)


    def __str__(self):
        return f"Review {self.id}: {self.text}"
