// imports react into the file
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Navbar } from "../navbar/navbar";
import ProfileView from "../profile-view/profile-view";

// export makes the new component usable by others, the class indicates that the component is a class component and not a function while MainView is the new components name . extends React.component uses generic react component template and creates the MainView Component
export class MainView extends React.Component {
  constructor() {
    // React uses this constructor method to create the component
    super(); // it means call the constructor of the parent class i.e the class called after the extends keyword (React.Component)
    this.state = {
      // the MainView state is initialized
      movies: [],
      // selectedMovie: null,
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://marcey-flix-movie-app.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // when a user successfully logs in, this function updates the 'user' property in state to that particular user
  onLoggedIn(authData) {
    // the parameter authData is ised because we need to use both user and the token
    console.log(authData);
    this.setState({
      user: authData.user.Username, // user's username is saved in the user state
    });

    //the auth information received from the handleSubmit method is saved in the local storage
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token); // gets the movies from the Api once the user is logged in... 'this' refers to the object itself and in this case it is MainView class
  }

  // allows a user to log out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    // if the state of the 'selectedMovie' is not null, that selected movie will be returned otherwise, all the movies will be returned
    //place Navbar after the router to enable it appear in all the views
    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              // if there is no user tht logiview is rendered . if there is a user logged in the user details are passed as a prop to the LoginView
              if (!user)
                return (
                  <Col>
                    <LoginView
                      //  movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );

              //Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      //  movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genre/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/user-update/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
