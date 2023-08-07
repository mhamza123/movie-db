import React, { useState } from 'react';

const AddMovieForm = ({ onMovieAdded }) => {
  const [movieName, setMovieName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //const movieName = event.target.elements.movieName.value;
  
    const newMovie = {
      name: movieName,
      // Add other movie properties as needed
    };
  
    fetch(`http://localhost:8000/backend/api/add-movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie added:", data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Name:
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
