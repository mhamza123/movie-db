# Generated by Django 4.1.10 on 2023-08-09 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('Description', models.TextField()),
                ('release', models.CharField(max_length=4)),
                ('duration', models.CharField(max_length=10)),
                ('img', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie_id', models.PositiveIntegerField()),
                ('text', models.TextField()),
                ('star', models.PositiveIntegerField()),
                ('username', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('favorites', models.ManyToManyField(related_name='favorited_by', to='backend.movie')),
            ],
        ),
    ]
