// imports react into the file
import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// export makes the new component usable by others, the class indicates that the component is a class component and not a function while MainView is the new components name . extends React.component uses generic react component template and creates the MainView Component
export class MainView extends React.Component {
  constructor() {
    // React uses this constructor method to create the component
    super(); // it means call the constructor of the parent class i.e the class called after the extends keyword (React.Component)
    this.state = {
      // the MainView state is initialized
      movies: [
        {
          _id: "6341b6f267ec5a3a299a0be4",
          Title: "Silence of the Lambs",
          Description:
            "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another terrible serial killer.",
          Genre: {
            Name: "Thriller",
            Description:
              "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience",
          },
          Director: {
            Name: "Jonathan Demme",
            Bio: "Robert Jonathan Demme was an American producer and screenwriter.",
            Birth: "1944",
            Death: "2017",
          },
          ImagePath:
            "https://www.imdb.com/title/tt0102926/mediaviewer/rm803658241/?ref_=ext_shr_lnk",
          Featured: true,
        },
        {
          _id: "6342c4f0fdf1acf46b22e531",
          Title: "Emily in Paris",
          Description:
            "Emily brings her can-do American attitude and fresh ideas to her new office in Paris, but her inability to speak French turns out to be a major Faux pas",
          Genre: {
            Name: "Comedy",
            Description:
              "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effects",
          },
          Director: {
            Name: "Darren Star",
            Bio: "Darren Star is an American writer, director and producer of film and television. He is best known for creating the television series Beverly Hills, 90210, Melrose Place, Sex and the City, Younger, and Emily in Paris",
            Birth: "1961-07-25",
          },
          ImagePath: "https://www.netflix.com/de-en/title/81037371",
          Featured: false,
        },
        {
          _id: "6342d662fdf1acf46b22e534",
          Title: "The 40 year old Virgin",
          Description:
            "Andy, a forty-year-old virgin, works at an electronics store and is happy with his life. When his co-workers learn about his celibacy, they decide to help him lose his virginity.",
          Genre: {
            Name: "Comedy",
            Description:
              "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effects",
          },
          Director: {
            Name: "Judd Apatow",
            Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
            Birth: "1967-01-01",
          },
          ImagePath:
            "https://upload.wikimedia.org/wikipedia/en/4/43/40-Year-OldVirginMoviePoster.jpg",
          Featured: true,
        },
      ],
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    //if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

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
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
