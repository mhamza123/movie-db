import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const Search = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]); 
  const [isPending, setIsPending] = useState(true);
  const [isScraping, setIsScraping] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/backend/api/movies/')
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch the data for movies...');
        }
        return response.json();
      })
      .then(data => {
        console.log('Movies data in fetch:', data);
        setMoviesData(data);
        setIsPending(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setIsPending(false);
      });
  }, []);

  useEffect(() => {
    if (query && !isPending) {
        let filteredMovies = [];
        if (moviesData.length) {
            console.log('Movies data:', moviesData);
            filteredMovies = moviesData.filter(movie => {
                console.log('Movie:', movie);
                const lowerCaseQuery = query.toLowerCase();
                return (
                movie.name && movie.name.toLowerCase().includes(lowerCaseQuery) ||
                movie.Description && movie.Description.toLowerCase().includes(lowerCaseQuery)
                );
            });
        }

        console.log('Filtered movies:', filteredMovies);

        if (filteredMovies.length === 0) {
            setIsScraping(true);
            console.log('Scraping movie...');
            scrapeMovie(query);
        } else {
            setMovies(filteredMovies || []);
            setIsScraping(false);
        }
    }
  }, [query, isPending]);

 const scrapeMovie = async (movieName) => {
  try {
    const response = await axios.get(`http://localhost:8000/backend/api/scrape-movie/?movie_name=${movieName}`);
    const result = response.data;
    setMovies(Array.isArray(result) ? result : [result]); 
    setIsScraping(false);
    } 
    catch (error) {
        setIsScraping(false);
        console.error('Error scraping movie:', error);
    }
  };

  return (
    <div className="home">
      <div style={{ display: "grid", alignContent: "center" }}>
        <h2 style={{color: "#efef83"}}>Search Results for "{query}"</h2>
        {isScraping && <div>Scraping movie...</div>}
        {isPending && !isScraping && <div>Loading...</div>}
        {!isPending && !isScraping && movies.length === 0 && <p style={{color: "#efef83"}}>No Movies Found</p>}
        {!isScraping && movies.map(movie => (
          <div key={movie.id}>
            <div className="movie-preview" key={movie.id}>
              <div className="image">
                <Link to={`/movie/${movie.id}`}>
                  <img src={`/static${movie.img}`} alt={movie.name} />
                </Link>
              </div>
              <div className="info">
                <Link to={`/movie/${movie.id}`}>
                  <h2>{movie.name}</h2>
                </Link>
                <p>Description: {movie.Description}</p>
                <p>Release: {movie.release}</p>
                <p>Duration: {movie.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
