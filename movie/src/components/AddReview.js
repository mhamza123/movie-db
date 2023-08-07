import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import "../styles/AddReview.css"
import useFetch from './useFetch';

const AddReview = ({ username }) => {
  const id = window.location.pathname.split('/')[2];
  const history = useHistory();

  const { error: movieError, isPending: moviePending, data: movie } = useFetch(`http://localhost:8000/backend/api/movies/${id}/`);

  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      username,
      movie_id: parseInt(id),
      text: reviewText,
      star: starRating,
    };

    fetch(`http://localhost:8000/backend/api/movies/${id}/add-reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        console.log(newReview)
        if (response.ok) {
            console.log("Review to be submitted:", newReview);
          history.push(`/movie/${id}`);
        } else {
          console.log("Rmjnjhbhnjtted:", newReview);
          //throw new Error("Failed to submit the review.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="reviewPage">
      {moviePending ? (
        <div className="movie-Details">Loading...</div>
      ) : (
        movie && (
          <div className="moviess">
            <div className="movieDetails">
              <div className="imageAndRest">
                <img src={`/static${movie.img}`} alt={movie.title} />
                <div className="restInfoAndButtons">
                  <div className="nameAndButtons">
                    <h2>{movie.name}</h2>
                  </div>
                  <div className="info">
                    <p>Description: {movie.description}</p>
                    <p>Release: {movie.release}</p>
                    <p>Duration: {movie.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <div className="add-review">
        <h2>Add Your Review</h2>
        <div className="form-group">
          <label>Username: </label>
          <span>{username}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Star Rating:</label>
            <input
              type="number"
              id="rating"
              value={starRating}
              onChange={(e) => setStarRating(parseInt(e.target.value))}
              min={0}
              max={5}
              required
            />
          </div>
          <button type="submit">Submit Review</button> {/* Corrected the type */}
        </form>
      </div>
    </div>
  );
};

export default AddReview;
