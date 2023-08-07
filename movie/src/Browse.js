import { Link } from 'react-router-dom';
import React, { Component } from "react";
import '../static/css/Browse.css'

const Browse = ({ movies }) => {
  return (
    <div className="movies-list"> 
      {movies.map(movie => (
        <div className="movie-preview" key={movie.id} >
          <div className="image">
            <img src={require(`${movie.img}`)} />
          </div>
          <div className="info">

            <Link to={`/movie/${movie.id}`}>
                <h2>{ movie.name }</h2>
            </Link>
            <p>Description: { movie.description }</p>
            <p>Release: { movie.release }</p>
            <p>Duration: { movie.duration }</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Browse;