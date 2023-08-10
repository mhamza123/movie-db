import React, {Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login.js';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import AllMovies from './components/AllMovies.js';
import Movie from './components/Movie.js';
import AddReview from './components/AddReview.js';
import Footer from './components/Footer.js';
import AddMovie from './components/AddMovie.js';
import Search from './components/Search.js';
import About from './components/About.js';
import '../static/css/App.css'

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: localStorage.getItem('username') || '',
      };
  }

  componentDidMount() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.updateUsername(storedUsername);
    }
  }

  updateUsername = (username) => {
    this.setState({username});
  };

  handleMovieAdded = (movie) => {
    console.log('Movie added:', movie);
  };
    
  render() {
    const { username } = this.state;
    return(
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
                  {username ? <Redirect to="/home" /> : <Redirect to="/login" />}
                </Route>
              <Route exact path="/login">
                <Login onLogin={this.updateUsername}/>
              </Route>
              <div>
                <Navbar username={username} />
                <Route exact path="/home">
                  {username ? <Home /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/browse" > <AllMovies/> </Route>
                <Route exact path="/movie/:movie_id/add-review"><AddReview username= {username}/></Route>
                <Route exact path="/movie/:id"><Movie></Movie></Route>
                <Route path="/add-movie" component={AddMovie} />
                <Route exact path="/search/:query"><Search></Search></Route>
                <Route exact path="/about"><About/></Route>
                <Footer />

              </div>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
