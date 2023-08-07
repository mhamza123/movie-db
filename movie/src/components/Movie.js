// Movie.js
import React, {useState} from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import "../styles/Movie.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Movie = ({StaticUrl, username}) => {
  const [favText, setFavText] = useState('Add to Favourite');
  const { id } = useParams();
  const { error: movieError, isPending: moviePending, data: movie } = useFetch(`http://localhost:8000/backend/api/movies/${id}/`);
  const { error: reviewError, isPending: reviewPending, data: reviews } = useFetch(`http://localhost:8000/backend/api/reviews/`);
  const history = useHistory();
  const handleAddToFav = () => {
    if (favText === 'Add to Favourite') {
      setFavText('Remove From Favourite');
    } 
    else {
      setFavText('Add to Favourite');
    }
  }



  if (movieError || reviewError) {
    return <div className="movieDetails">{movieError || reviewError}</div>;
  }

  return (
    <div className="movieDetails">
      {moviePending || reviewPending ? (
        <div className="movieDetails">Loading...</div>
      ) : (
        movie && (
          <div className="movies">
            <div className="movieDetails">
              <div className="imageAndRest">
              <img src={`/static${movie.img}`} alt={movie.title} />
                <div className="restInfoAndButtons">
                    <div className="nameAndButtons">
                    <h2>{movie.name}</h2>
                        <div className="details2">
                            <button onClick={handleAddToFav}>{favText}</button>
                            <button onClick={() => history.push(`/movie/${id}/add-review`)}>Add Review</button>
                        </div>
                    </div>
                    <div className="info">
                        <p>Description: {movie.description}</p>
                        <p>Release: {movie.release}</p>
                        <p>Duration: {movie.duration}</p>
                    </div>
                </div>
                
                
              </div>
              
            </div>
            <div>
            <div>
                <h2>Reviews: </h2>
            </div>
            {reviews &&
                reviews
                  .map((review) => (
                    (review.movie_id === movie.id) && (
  
                        <div className="reviews">
                            <div className="profile-circle">{review.username.charAt(0).toUpperCase()}</div>
                            <div className="info">
                                <p>Username: {review.username}</p>
                                <p>Review: {review.text}</p>
                                <p>Star: {getStarRating(review.star)}</p>
                            </div>
                        </div>
                    )
            ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Movie;

const getStarRating = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
};