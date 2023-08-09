import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Navbar.css";
import useFetch from "./useFetch";

const Navbar = ({ username }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]); // State to store the list of movies
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const history = useHistory();
 
  const { error, isPending, data: moviesData } = useFetch('http://localhost:8000/backend/api/movies');

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
    
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData);
    }
  }, [moviesData]);


  const handleLogout = () => {
    fetch('http://localhost:8000/backend/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.clear();
          history.push('/login');
        } else {
          throw new Error('Failed to logout.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

const handleSearch = (e) => {
  setSearchQuery(e.target.value);
  const query = e.target.value.toLowerCase();
  const matchingSuggestions = movies.filter(movie =>
    movie.name.toLowerCase().includes(query)
  );
  setSearchSuggestions(matchingSuggestions.map(movie => movie.name));
};

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={handleToggleMenu}>
        <a><img src="/static/images/hamburger.png" ></img></a>
      </div>
      <div className={`links ${isMenuOpen ? "show" : ""}`}>
        <Link to="/home" onClick={handleToggleMenu}>Home</Link>
        <Link to="/browse" onClick={handleToggleMenu}>All Movies</Link>
        <Link to="/about" onClick={handleToggleMenu}>About</Link>
        <Link to="/add-movie" onClick={handleToggleMenu}>Add Movie</Link>
      </div>
     
      <div className="userinfo">
        <div className="search-bar">
        <form onSubmit={(e) => {
            e.preventDefault();
            history.push(`/search/${searchQuery}`);
          }}>
            <input
              type="text"
              placeholder="Search Movies"
              value={searchQuery}
              onChange={handleSearch}
              list="searchSuggestions"
            />
            <datalist id="searchSuggestions">
              {searchSuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
            <button onClick={() => history.push(`/search/${searchQuery}`)}>Search</button>
          </form>
        </div>
        <Link to={`/update-profile/${username}`}>{username}</Link>
        <div className="profile-circle">{firstLetter}</div>
        <button className="logout-btn" onClick={handleLogout}> Logout </button>
      </div>
    </nav>
  );
};

export default Navbar;