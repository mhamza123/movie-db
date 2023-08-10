import React, { useState, useEffect } from "react";
import Browse from "./Browse";
import useFetch from "./useFetch";
import '../styles/Home.css';

const Home = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [movies, setMovies] = useState([]);
  const staticUrl = '{% static "" %}';

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
      <div className="welcome">
        <h1>Welcome to HahaHollywood</h1>
        <p>Here you can review and search your favourite movies.</p>
        <p>Enjoy!</p>
      </div>
      <div className="browseMovies">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { movies && <Browse movies={movies} staticUrl={staticUrl} /> }
      </div>
    </div>
  );
}
 
export default Home;