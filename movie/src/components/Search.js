import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";



const Search = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]); 
  const [isPending, setIsPending] = useState(true);
 // const { error, isPending, data: moviesData } = useFetch('http://localhost:8000/backend/api/movies');
  
  useEffect(() => {
    fetch('http://localhost:8000/backend/api/movies/')
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch the data for movies...');
        }
        return response.json();
      })
      .then(data => {
        setMoviesData(data);
        setIsPending(false);
      })
      .catch(error => {
        setError(error.message);
        setIsPending(false);
      });
  }, []);

  useEffect(() => {
    if (moviesData) {
      const filteredMovies = moviesData.filter(movie => {
        const lowerCaseQuery = query.toLowerCase();
        return (
          movie.name && movie.name.toLowerCase().includes(lowerCaseQuery) ||
          movie.Description && movie.Description.toLowerCase().includes(lowerCaseQuery)
        );
      });

      setMovies(filteredMovies);
    }
    else {
        const [movieName, setMovieName] = useState('');
        const [movieDetails, setMovieDetails] = useState(null);
      
        const scrapeMovie = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/backend/api/scrape-movie/?movie_name=${movieName}`);
            setMovieDetails(response.data);
          } catch (error) {
            console.error('Error scraping movie:', error);
          }
        };
        
        scrapeMovie();
        setMovies(movieDetails);
    }
  }, [moviesData, query]);

  return (
    <div className="home">
      <div style={{ display: "grid", alignContent: "center" }}>
        <h2 style={{color: "#efef83"}}>Search Results for "{query}"</h2>
        {isPending && <div>Loading...</div>}
        {movies.length === 0 && !isPending && <p style={{color: "#efef83"}}>No Movies Found</p>}
        {movies.map(movie => (
          <div key={movie.id}>
            <div className="movie-preview" key={movie.id} >
              <div className="image">
                <Link to={`/movie/${movie.id}`}>
                  <img src={`/static${movie.img}`} alt={movie.name} />
                </Link>
              </div>
              <div className="info">
                <Link to={`/movie/${movie.id}`}>
                  <h2>{ movie.name }</h2>
                </Link>
                <p>Description: { movie.Description }</p>
                <p>Release: { movie.release }</p>
                <p>Duration: { movie.duration }</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Search;