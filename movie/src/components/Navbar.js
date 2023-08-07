import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Navbar.css";
import useFetch from "./useFetch";

const Navbar = ({ username }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const history = useHistory();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    fetchSearchSuggestions(e.target.value);
  };

  const fetchSearchSuggestions = (query) => {
    // Implement your logic to fetch search suggestions from the backend API
    // For example:
    // fetch(`http://localhost:8000/search/suggestions?query=${query}`)
    //   .then((response) => response.json())
    //   .then((data) => setSearchSuggestions(data));
    // Replace the above code with your actual API call to get search suggestions.
    // It's important to debounce the API call to avoid making too many requests in a short time.
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
          <input type="text" placeholder="Search Movies" value={searchQuery} onChange={handleSearch} />
          <datalist id="searchSuggestions">
            {searchSuggestions.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
          <button>Search</button>
        </div>
        <Link to={`/update-profile/${username}`}>{username}</Link>
        <div className="profile-circle">{firstLetter}</div>
        <button className="logout-btn" onClick={handleLogout}> Logout </button>
      </div>
    </nav>
  );
};

export default Navbar;