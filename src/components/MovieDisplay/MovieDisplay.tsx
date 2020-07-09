import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  CardContent,
  Card,
  Chip,
  Button,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { IMovie, IGenre, IMatchParameters } from '../../api/models';
import {
  fetchAccountDetails,
  addWatchList,
  fetchRatedMovies,
  fetchWatchList,
  requestDeleteMovieRating,
} from '../../store/account/thunks';
import { IAccountState } from '../../store/account/types';
import { match, useRouteMatch } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IRequestAuthState } from '../../store/auth/types';
import { requestRateMovie } from '../../store/account/thunks';
import { getImageURL } from '../../api/api';
interface IMovieDisplayStore {
  account: IAccountState;
  sessionId?: string;
  movie?: IMovie;
  auth: IRequestAuthState;
}

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
  userRatingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  userRating: {
    fontSize: '1rem',
    marginLeft: '0.2rem',
  },
  userRatingRemoveButtonCircle: {
    color: '#F9BE51',
    fontSize: '1rem',
    marginLeft: '0.2rem',
    cursor: 'pointer',
  },
}));

const MovieDisplay: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matchData: match<IMatchParameters> = useRouteMatch() as match<
    IMatchParameters
  >;
  const movieId: number = Number(matchData.params.movieId);

  const store = useSelector<RootState, IMovieDisplayStore>(
    (state: RootState) => ({
      account: state.account,
      sessionId: state.auth.sessionId,
      movie: state.movie.movie,
      auth: state.auth,
    })
  );

  const [movieIsOnWacthlist, setMovieIsOnWatchList] = useState(false);
  const [watchlistButtonText, setWatchlistButtonText] = useState(
    'Add to watchlist'
  );
  const [movieUserRating, setMovieUserRating] = useState(0);

  useEffect(() => {
    if (store.sessionId) {
      dispatch(fetchAccountDetails(store.sessionId));
      dispatch(fetchRatedMovies(store.sessionId));
      dispatch(fetchWatchList(store.sessionId));
    }
  }, [dispatch, store.sessionId]);

  function checkWatchList() {
    if (store.sessionId && store.account.watchlist) {
      const isOnWatchList = store.account.watchlist.some(
        (watchMovie: IMovie) => watchMovie.id === movieId
      );
      if (isOnWatchList) {
        setMovieIsOnWatchList(true);
        setWatchlistButtonText('Remove from watchlist');
      }
    }
  }

  useEffect(checkWatchList, [store.account.watchlist]);

  const checkIfUserRatedMovie = () => {
    if (store.sessionId && store.account.ratedMovies) {
      const ratedMovie = store.account.ratedMovies.find(
        movie => movie.id === movieId
      );
      if (ratedMovie && ratedMovie.rating) {
        const realValue = ratedMovie.rating / 2; // This is to divide the value so it scales from 0-10 to 0-5
        setMovieUserRating(realValue);
        return;
      }
    }
    setMovieUserRating(0);
  };

  useEffect(checkIfUserRatedMovie, [store.account.ratedMovies]);

  if (
    store.account.isFetchingAccount ||
    store.account.isFetchingWatchlist ||
    store.account.isFetchingRatedMovies
  ) {
    return <p>Loading..,</p>;
  }

  let movieGenres: Array<IGenre> = [];
  if (store.movie) {
    movieGenres = store.movie.genres;
  }

  async function addToWatchList() {
    let watchlist;
    if (movieIsOnWacthlist) {
      watchlist = false;
    } else {
      watchlist = true;
    }

    let media_id = 0;
    const media_type = 'movie';
    if (store.movie) {
      media_id = store.movie.id;
    }

    const data = { media_type, media_id, watchlist };
    if (store.sessionId) {
      await dispatch(addWatchList(store.sessionId, data));
    }
    if (watchlist) {
      setMovieIsOnWatchList(true);
      setWatchlistButtonText('Remove from watchlist');
    } else {
      setWatchlistButtonText('Add to watchlist');
      setMovieIsOnWatchList(false);
    }
  }

  const rateMovie = (value: number | null) => {
    if (!value) return;
    const realValue = value * 2; // This is to duplicate the value so it scales from 0-5 to 0-10
    const movieId = store.movie?.id ?? 0;
    const sessionId = store.auth.sessionId ?? '';
    setMovieUserRating(value);
    dispatch(requestRateMovie(movieId, realValue, sessionId));
  };

  const deleteUserMovieRating = () => {
    const movieId = store.movie?.id ?? 0;
    const sessionId = store.auth.sessionId ?? '';
    setMovieUserRating(0);
    dispatch(requestDeleteMovieRating(movieId, sessionId));
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardWrapper}>
        <div className={classes.imgWrapper}>
          <img
            className={classes.movieImg}
            src={
              store.movie && store.movie.poster_path
                ? getImageURL(store.movie.poster_path)
                : ''
            }
            alt=""
          />
        </div>
        <div className={classes.textWrapper}>
          <div className={classes.ratingWrapper}>
            {store.movie?.vote_average}
          </div>
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
          <h2 className={classes.movieTitle}>{store.movie?.original_title} </h2>
          <span className={classes.movieTagLine}>{store.movie?.tagline}</span>
          {store.sessionId && (
            <Button
              onClick={addToWatchList}
              variant="outlined"
              color="secondary"
              size="small"
            >
              {watchlistButtonText}
            </Button>
          )}
          <p>{store.movie?.overview}</p>
          <p>
            <b>Release Date:</b> {store.movie?.release_date}
          </p>
          <p>
            <b> Duration:</b> {store.movie?.runtime} minutes
          </p>
          {store.sessionId && (
            <p className={classes.userRatingWrapper}>
              <b> Rate:</b>
              <Rating
                name="rating"
                className={classes.userRating}
                value={movieUserRating}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  rateMovie(newValue);
                }}
              />
              {movieUserRating != 0 && (
                <Tooltip title="Remove Rating">
                  <RemoveCircleIcon
                    className={classes.userRatingRemoveButtonCircle}
                    onClick={() => deleteUserMovieRating()}
                  />
                </Tooltip>
              )}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieDisplay;
