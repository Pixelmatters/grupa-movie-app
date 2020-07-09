import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, Box, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { IAccountState } from '../../store/account/types';
import { fetchWatchList, addWatchList } from '../../store/account/thunks';
import { getImageURL, getNotFoundImage } from '../../api/api';
import { IMovie } from '../../api/models';
import { useHistory } from 'react-router';
import { ArrowRight, Remove, Add } from '@material-ui/icons';

interface IMovieDisplayStore {
  account: IAccountState;
  sessionId?: string;
  watchlist: {
    data?: Array<IMovie>;
    isToggling: boolean;
    isFetching: boolean;
  };
}

const useStyles = makeStyles(styles => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: styles.palette.background.paper,
    boxShadow: styles.shadows[5],
    left: '10%',
    top: '5vh',
    overflow: 'scroll',
    maxHeight: '90vh',
  },
  pageTitle: {
    textAlign: 'center',
    paddingBotton: '5rem',
  },
  moviesWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  movieImg: {
    maxWidth: 400,
  },
  movieItem: {
    padding: '0 15px',
  },
  itemWrapper: {
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '1rem',
    margin: '0 1rem',
  },
  checkHelper: {
    display: 'none',
    '&:checked': {
      '& ~ div': {
        height: '99%',
        transition: 'height 1s ease, opacity 3s ease',
        padding: '0.5rem',
        transform: 'translateZ(0)',
        opacity: 1,
      },
      '& ~ div > $movieRate': {
        opacity: 1,
      },
      '& ~ img': {
        filter: 'grayscale(80%)',
      },
    },
  },
  info: {
    position: 'absolute',
    width: '100%',
    height: 0,
    bottom: '4px',
    backgroundColor: 'rgba(72, 72, 72, 0.84)',
    color: styles.palette.primary.contrastText,
    boxSizing: 'border-box',
    opacity: 0,
  },
  movieRate: {
    opacity: 0,
    width: '2rem',
    height: '2rem',
    backgroundColor: '#d88e06',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    float: 'right',
  },

  itemTitle: {
    fontSize: '1rem',
  },
  movieSinopse: {
    height: '15rem',
    [styles.breakpoints.down('sm')]: {
      height: '10rem',
    },
  },
  cardOptions: {
    display: 'flex',
    marginTop: '8rem',
    padding: '2rem',
    justifyContent: 'space-between',
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  buttonOptions: {
    color: '#F9BE51',
    fontSize: '1rem',
    [styles.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    fontWeight: 800,
  },
  movieImage: {
    animation: '$fadeIn ease 3s',
    transform: 'translateZ(0)',
    width: 400,
    height: 600,
    [styles.breakpoints.down('sm')]: {
      width: 350,
      height: 500,
    },
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  emptyState: {
    height: '20rem',
    textAlign: 'center',
  },
}));
const Watchlist: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector<RootState, IMovieDisplayStore>(
    (state: RootState) => ({
      account: state.account,
      sessionId: state.auth.sessionId,
      movie: state.movie.movie,
      watchlist: {
        data: state.account.watchlist,
        isToggling: state.account.isAddingWatchlist,
        isFetching: state.account.isFetchingWatchlist,
      },
    })
  );

  const [hasWatchlistItems, setHasWatchlistItem] = useState<boolean>(true);

  function checkWatchlistItems() {
    if (
      store.account &&
      store.account.watchlist &&
      store.account.watchlist.length > 0
    ) {
      setHasWatchlistItem(true);
    } else {
      setHasWatchlistItem(false);
    }
  }
  useEffect(checkWatchlistItems, [store.account.watchlist]);

  useEffect(() => {
    if (store.sessionId) {
      dispatch(fetchWatchList(store.sessionId));
    }
  }, [dispatch, store.sessionId]);

  if (store.account.isFetchingWatchlist) {
    return (
      <div className={classes.paper}>
        <h1>Loading</h1>
      </div>
    );
  }

  if (!hasWatchlistItems) {
    return (
      <div className={classes.paper}>
        <div className={classes.emptyState}>
          <h1>Watchlist</h1>
          <p>Checklist is empty</p>
        </div>
      </div>
    );
  }

  const renderImage = (path?: string, altText?: string) => {
    const localPath = path
      ? getImageURL(path)
      : getNotFoundImage('400x600/FFFFFF');

    return <img className={classes.movieImage} src={localPath} alt={altText} />;
  };

  const openMovieDetails = (id: number) => {
    history.push(`/movie/${id}`);
  };

  const toggleWatchlist = (item: IMovie, to: boolean) => {
    if (store.sessionId) {
      dispatch(
        addWatchList(store.sessionId, {
          media_id: item.id,
          media_type: 'movie',
          watchlist: to,
        })
      );
      checkWatchlistItems();
    }
  };

  const getWatchlistButton = (item: IMovie) => {
    if (store.sessionId) {
      const isLoading =
        store.watchlist.isToggling || store.watchlist.isFetching;
      const isInWatchlist = store.watchlist.data?.some(
        movie => movie.id === item.id
      );
      return (
        <Button
          disabled={isLoading}
          className={classes.buttonOptions}
          onClick={() => toggleWatchlist(item, !isInWatchlist)}
        >
          {isInWatchlist ? <Remove /> : <Add />} Watch list
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={classes.paper}>
      <h1 className={classes.pageTitle}>Watchlist</h1>
      <div className={classes.moviesWrapper}>
        {store.account &&
          store.account.watchlist &&
          store.account.watchlist.map((item: IMovie) => (
            <label key={item.id}>
              <Box className={classes.itemWrapper}>
                <input
                  type="radio"
                  name="radio"
                  value="small"
                  className={classes.checkHelper}
                />
                {renderImage(item.poster_path, item.title)}
                <Box className={classes.info}>
                  <Box className={classes.movieRate}>{item.vote_average}</Box>
                  <Box component="h5" className={classes.itemTitle}>
                    {item.title}
                  </Box>
                  <Box component="p" className={classes.movieSinopse}>
                    {item.overview}
                  </Box>
                  <Box className={classes.cardOptions}>
                    <Button
                      className={classes.buttonOptions}
                      onClick={() => openMovieDetails(item.id)}
                    >
                      <ArrowRight /> See more
                    </Button>
                    {getWatchlistButton(item)}
                  </Box>
                </Box>
              </Box>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Watchlist;
