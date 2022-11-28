import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>

        <div className="movie-title">
          <span className="label">Title:</span>
          <span className="value"> {movie.Title} </span>
        </div>

        <div>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>

        <div>
          <Link to={`/genres/${movie.Genres.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>

        <div className="movie-description">
          <span className="label"> Description:</span>
          <span className="value"> {movie.Description} </span>
        </div>

        <div className="movie-genre">
          <span className="label"> Genre:</span>
          <span className="value"> {movie.Genre.Name} </span>
        </div>

        <div className="movie-director">
          <span className="label"> Director:</span>
          <span className="value"> {movie.Director.Name} </span>
        </div>

        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
