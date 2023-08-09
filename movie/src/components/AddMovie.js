// components/AddMovie.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = () => {
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

  return (
    <div>
      <h2>Add Movie</h2>
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={scrapeMovie}>Scrape Movie</button>
      {movieDetails && (
        <div>
          <h3>{movieDetails.name}</h3>
          <p>{movieDetails.Description}</p>
          <img src={`/static${movieDetails.img}`} alt={movieDetails.name} />
          <p>Duration: {movieDetails.duration}</p>
          <p>Release: {movieDetails.release}</p>
          {/* Add a form to save the scraped details in your database */}
        </div>
      )}
    </div>
  );
};

export default AddMovie;
