import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React, { FunctionComponent } from 'react';
import { CardContent, Card, Chip, Button } from '@material-ui/core';
import { IMovie, IGenre } from '../../api/models';
import './MovieDisplay.css';
const MovieDisplay: FunctionComponent = () => {
  const movieData: IMovie = useSelector(
    (state: RootState) => state.movie.movie
  ) as IMovie;
  if (movieData === undefined) {
    return <p>Loading..,</p>;
  }
  const movieGenres: Array<IGenre> = movieData.genres;
  return (
    <Card className="card">
      <CardContent className="card-wrapper">
        <div className="img-wrapper">
          <img
            className="movie-img"
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt=""
          />
        </div>
        <div className="text-wrapper">
          <div className="rating-wrapper">{movieData.vote_average}</div>
          <div className="label-wrapper">
            {movieGenres.map((genre: IGenre) => {
              return (
                <Chip
                  label={genre.name}
                  variant="outlined"
                  className="genre-label"
                  color="secondary"
                  key={genre.id}
                />
              );
            })}
          </div>
          <h2 className="movie-title">{movieData.original_title} </h2>
          <span className="movie-tagline">{movieData.tagline}</span>
          <Button variant="outlined" color="secondary" size="small">
            Add to watchlist
          </Button>
          <p>{movieData.overview}</p>
          <p>
            <b>Release Date:</b> {movieData.release_date}
          </p>
          <p>
            <b> Duration:</b> {movieData.runtime} minutes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieDisplay;
