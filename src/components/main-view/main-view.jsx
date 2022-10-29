// imports react into the file
import React from "react";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// export makes the new component usable by others, the class indicates that the component is a class component and not a function while MainView is the new components name . extends React.component uses generic react component template and creates the MainView Component
export class MainView extends React.Component {
  constructor() {
    // React uses this constructor method to create the component
    super(); // it means call the constructor of the parent class i.e the class called after the extends keyword (React.Component)
    this.state = {
      // the MainView state is initialized
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://marcey-flix-movie-app.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // when a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  //when a user successfully logs in, this function updates the 'user' property in state to that particular user
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    //if there is mo user the LoginView is rendered. if there is a user logged in the user details are passed as a prop to the LoginView
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    //before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    // if the state of the 'selectedMovie' is not null, that selected movie will be returned otherwise, all the movies will be returned
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
