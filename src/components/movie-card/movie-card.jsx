import React from "react";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props; // movie is the name of the prop i.e movie without curly brackets
    return (
      <div
        className="movie-card"
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  }
}
