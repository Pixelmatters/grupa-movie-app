import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { CardContent, Card, Chip, Button, makeStyles } from '@material-ui/core';
import { IMovie, IGenre, IMatchParameters } from '../../api/models';
import {
  fetchAccountDetails,
  addWatchList,
  fetchRatedMovies,
  fetchWatchList,
} from '../../store/account/thunks';
import { IAccountState } from '../../store/account/types';
import { match, useRouteMatch } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import { getImageURL } from '../../api/api';
interface IMovieDsiplayStore {
  account: IAccountState;
  sessionId?: string;
  movie?: IMovie;
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
}));

const MovieDisplay: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matchData: match<IMatchParameters> = useRouteMatch() as match<
    IMatchParameters
  >;
  const movieId: number = Number(matchData.params.movieId);

  const store = useSelector<RootState, IMovieDsiplayStore>(
    (state: RootState) => ({
      account: state.account,
      sessionId: state.auth.sessionId,
      movie: state.movie.movie,
    })
  );

  const [movieIsOnWacthlist, setMovieIsOnWatchList] = useState(false);
  const [watchlistButtonText, setWatchlistButtonText] = useState(
    'Add to watchlist'
  );
  const [rateValue, setRateValue] = useState<number | null>(0);

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
          <Button
            onClick={addToWatchList}
            variant="outlined"
            color="secondary"
            size="small"
          >
            {watchlistButtonText}
          </Button>
          <p>{store.movie?.overview}</p>
          <p>
            <b>Release Date:</b> {store.movie?.release_date}
          </p>
          <p>
            <b> Duration:</b> {store.movie?.runtime} minutes
          </p>
          <p className={classes.userRatingWrapper}>
            <b> Rate:</b>
            <Rating
              className={classes.userRating}
              value={rateValue}
              onChange={(event, newValue) => {
                setRateValue(newValue);
              }}
            />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieDisplay;
