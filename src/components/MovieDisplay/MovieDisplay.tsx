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
  withStyles,
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
import { getImageURL, getNotFoundImage } from '../../api/api';
import { Remove, Add } from '@material-ui/icons';
interface IMovieDisplayStore {
  account: IAccountState;
  sessionId?: string;
  movie?: IMovie;
  auth: IRequestAuthState;
}

const StyledRating = withStyles({
  icon: {
    color: '#fff',
  },
  iconFilled: {
    color: '#F9BE51',
  },
})(Rating);

const useStyles = makeStyles(styles => ({
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  cardWrapper: {
    display: 'flex',
    color: '#ffffff',
    background:
      'linear-gradient(180deg, rgba(0,15,41,1) 0%, rgba(3,23,87,1) 100%)',
    justifyContent: 'flex-start',
    padding: '50px 60px !important',
    maxWidth: '1200px',
    margin: '24px auto 58px',
    [styles.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  textWrapper: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '2rem',
    maxWidth: '800px',
    [styles.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  movieImg: {
    maxWidth: '400px',
    maxHeight: '800px',
  },
  genreLabel: {
    marginRight: '10px',
    marginTop: '18px',
    color: 'white',
    borderColor: 'white',
    fontSize: '15px',
  },
  movieTitle: {
    fontSize: '40px',
    margin: 0,
    marginTop: '15px',
  },
  movieTagLine: {},
  sectionTitle: {
    textAlign: 'center',
  },
  genresWrapper: {
    position: 'relative',
    left: '-3px',
  },
  movieReleaseDate: {
    margin: 0,
    marginTop: '18px',
  },
  movieRuntime: {
    margin: 0,
  },
  ratingWrapper: {
    fontSize: '28px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    left: '-5px',
  },
  userRatingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  userRating: {
    fontSize: '1.5rem',
    marginLeft: '0.2rem',
  },
  userRatingRemoveButtonCircle: {
    color: '#F9BE51',
    fontSize: '1rem',
    marginLeft: '0.2rem',
    cursor: 'pointer',
  },
  watchlistRatingWrapper: {
    display: 'flex',
  },
  ratingText: {
    fontSize: '16px',
    marginLeft: '10px',
    position: 'relative',
    top: '3px',
  },
  watchlistButton: {
    color: '#F9BE51',
    fontSize: '1rem',
    marginLeft: '10px',
    [styles.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    fontWeight: 800,
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
    } else {
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

  const renderImage = (path?: string, altText?: string) => {
    const localPath = path
      ? getImageURL(path)
      : getNotFoundImage('400x600/032b65', altText || '');

    return <img className={classes.movieImg} alt={altText} src={localPath} />;
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardWrapper}>
        <div className={classes.imgWrapper}>
          {renderImage(store?.movie?.poster_path, 'No image')}
        </div>
        <div className={classes.textWrapper}>
          <h2 className={classes.movieTitle}>{store.movie?.original_title} </h2>
          <span className={classes.movieTagLine}>{store.movie?.tagline}</span>
          <div className={classes.ratingWrapper}>
            <StyledRating
              name="rating"
              className={classes.userRating}
              value={
                store.movie &&
                store.movie.vote_average &&
                store.movie.vote_average / 2
              }
              size="large"
              precision={0.5}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <span className={classes.ratingText}>
              (
              {store.movie &&
                store.movie.vote_average &&
                store.movie.vote_average / 2}
              /5 in {store.movie?.vote_count} reviews)
            </span>
          </div>
          <div className={classes.genresWrapper}>
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

          <p className={classes.movieReleaseDate}>
            <b>Release Date:</b>{' '}
            {store?.movie?.release_date
              ? store?.movie?.release_date
              : 'No info'}
          </p>
          <p className={classes.movieRuntime}>
            <b> Duration:</b>{' '}
            {store.movie?.runtime
              ? `${store.movie?.runtime} minutes`
              : 'No info'}
          </p>
          <p>{store.movie?.overview}</p>
          <div className={classes.watchlistRatingWrapper}>
            {store.sessionId && (
              <p className={classes.userRatingWrapper}>
                <b> Your Rate:</b>
                <StyledRating
                  name="rating"
                  className={classes.userRating}
                  value={movieUserRating}
                  precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  onChange={(event, newValue) => {
                    rateMovie(newValue);
                  }}
                />
                {movieUserRating !== 0 && (
                  <Tooltip title="Remove Rating">
                    <RemoveCircleIcon
                      className={classes.userRatingRemoveButtonCircle}
                      onClick={() => deleteUserMovieRating()}
                    />
                  </Tooltip>
                )}
                {store.sessionId && (
                  <Button
                    className={classes.watchlistButton}
                    onClick={addToWatchList}
                    color="secondary"
                    size="small"
                  >
                    {movieIsOnWacthlist ? <Remove /> : <Add />} Watch list
                  </Button>
                )}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieDisplay;
