import React, { useState, useEffect } from "react";
import Browse from "./Browse";
import '../static/css/Home.css';

const Home = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/backend/api/movies/')
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch the data for movies...');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setIsPending(false);
      })
      .catch(error => {
        setError(error.message);
        setIsPending(false);
      });
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {movies && <Browse movies={movies} />}
    </div>
  );
}

export default Home;