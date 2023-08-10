import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);

  const scrapeMovie = async () => {
    try {
      console.log('Scraping movie...');
      const response = await axios.get(`http://localhost:8000/backend/api/scrape-movie/?movie_name=${movieName}`);
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error scraping movie:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='nameAndButtons' style={{ textAlign: 'center', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', animation: 'sparkle 1s linear infinite' }}>
        <h2 style={{ color: 'beige', margin: '16px', textShadow: '1px 1px 2px #555' }}>Add Movie</h2>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
          style={{
            padding: '8px',
            fontSize: '16px',
            marginRight: '16px',
          }}
        />
        <button
          onClick={scrapeMovie}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '1px 1px 2px #555',
          }}
        >
          Scrape Movie
        </button>
      </div>
      {movieDetails && (
        <div style={{ marginTop: '16px', animation: 'twinkle 2s ease-in-out infinite' }}>
          <h3 style={{ color: 'beige' }}>{movieDetails.name}</h3>
          <p style={{ color: 'beige' }}>{movieDetails.Description}</p>
          <img
            src={`/static${movieDetails.img}`}
            alt={movieDetails.name}
            style={{ maxWidth: '100%', height: 'auto', animation: 'twinkle 2s ease-in-out infinite' }}
          />
          <p style={{ color: 'beige' }}>Duration: {movieDetails.duration}</p>
          <p style={{ color: 'beige' }}>Release: {movieDetails.release}</p>
        </div>
      )}
    </div>
  );
};

export default AddMovie;
