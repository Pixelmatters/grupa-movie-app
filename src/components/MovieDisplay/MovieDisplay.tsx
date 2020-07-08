import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React, { FunctionComponent } from 'react';
import { CardContent, Card, Chip, Button, makeStyles } from '@material-ui/core';
import { IMovie, IGenre } from '../../api/models';

const useStyles = makeStyles(styles => ({
  card: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardWrapper: {
    display: 'flex',
    color: '#ffffff',
    background: '#2a3d7a',
    justifyContent: 'center',
    [styles.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  textWrapper: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '2rem',
    [styles.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  movieImg: {
    maxWidth: '20rem',
  },
  genreLabel: {
    marginRight: '1rem',
    marginTop: '1rem',
  },
  movieTitle: {
    fontSize: '40px',
  },
  movieTagLine: {
    paddingBottom: '2rem',
  },
  sectionTitle: {
    textAlign: 'center',
  },
  ratingWrapper: {
    border: '1px solid #ffffff',
    padding: '1rem',
    fontSize: '28px',
    marginBottom: '2rem',
    borderRadius: '8px',
    marginTop: '1rem',
  },
}));

const MovieDisplay: FunctionComponent = () => {
  const classes = useStyles();
  const movieData: IMovie = useSelector(
    (state: RootState) => state.movie.movie
  ) as IMovie;
  if (movieData === undefined) {
    return <p>Loading..,</p>;
  }
  const movieGenres: Array<IGenre> = movieData.genres;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardWrapper}>
        <div className={classes.imgWrapper}>
          <img
            className={classes.movieImg}
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt=""
          />
        </div>
        <div className={classes.textWrapper}>
          <div className={classes.ratingWrapper}>{movieData.vote_average}</div>
          <div>
            {movieGenres.map((genre: IGenre) => {
              return (
                <Chip
                  label={genre.name}
                  variant="outlined"
                  className={classes.genreLabel}
                  color="secondary"
                  key={genre.id}
                />
              );
            })}
          </div>
          <h2 className={classes.movieTitle}>{movieData.original_title} </h2>
          <span className={classes.movieTagLine}>{movieData.tagline}</span>
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
