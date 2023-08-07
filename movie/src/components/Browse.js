import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Browse.css'

const Browse = ({ movies, staticUrl }) => {
  return (
    <div className="movies-list">
      {movies.map(movie => (
        <div className="movie-preview" key={movie.id} >
          <div className="image">
          <img src={`/static${movie.img}`} alt={movie.title} />
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
      ))}
    </div>
  );
}

export default Browse;