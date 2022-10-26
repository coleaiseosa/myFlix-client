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
            "data:image/jpeg;base64,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",
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
          ImagePath:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTaTGG6_LWOAhbQeGv62MIp6KWisn3dJLvIg&usqp=CAU",
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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtN_ehKDTFtB8831aRklWG4BdfePqj2JzIUQ&usqp=CAU",
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
