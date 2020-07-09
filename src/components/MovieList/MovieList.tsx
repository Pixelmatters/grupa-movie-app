import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
  Grid,
  Box,
  CircularProgress,
  makeStyles,
  Theme,
  Button,
  withStyles,
} from '@material-ui/core';
import { IMovie } from '../../api/models';
import Masonry from 'react-masonry-css';
import { Remove, Add, ArrowRight, StarBorder } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getImageURL, getNotFoundImage } from '../../api/api';
import { addWatchList } from '../../store/account/thunks';
import { Rating } from '@material-ui/lab';

const StyledRating = withStyles({
  icon: {
    color: '#fff',
  },
  iconFilled: {
    color: '#F9BE51',
  },
})(Rating);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  masonryGrid: {
    display: 'flex',
    marginLeft: '-2.5rem' /* gutter size offset */,
    width: 'auto',
  },
  masonryGridColumn: {
    paddingLeft: '2.5rem' /* gutter size */,
    backgroundClip: 'padding-box',
  },
  info: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 0,
    bottom: 0,
    background:
      'linear-gradient(180deg, rgba(0,15,41,0.9150035014005602) 0%, rgba(3,23,87,0.9654236694677871) 100%);',
    color: theme.palette.primary.contrastText,
    boxSizing: 'border-box',
  },
  itemWrapper: {
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  checkHelper: {
    display: 'none',
    '&:checked': {
      '& + img': {
        filter: 'grayscale(80%)',
      },
      '& ~ $info': {
        height: '100%',
        transition: 'height 1s ease',
        padding: '2rem',
        transform: 'translateZ(0)',
      },
      '& ~ $info > div > $movieRate': {
        opacity: 1,
      },
    },
  },
  movieSinopse: {
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      height: '10rem',
    },
  },
  itemTitle: {
    fontSize: '2rem',
  },
  movieImage: {
    animation: '$fadeIn ease 3s',
    transform: 'translateZ(0)',
    width: 400,
    height: 600,
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 450,
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardOptions: {
    display: 'flex',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    fontWeight: 800,
  },
  movieRate: {
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
  },
  movieRateText: {
    marginLeft: '8px',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const breakpointColumnsObj = {
  default: 5,
  2095: 4,
  1727: 2,
  858: 1,
};

interface IMovieListStore {
  allMovies?: Array<IMovie>;
  watchlist: {
    data?: Array<IMovie>;
    isFetching: boolean;
  };
  sessionId?: string;
}

const MovieList: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState: Array<IMovie> = [];

  const [movieList, setMovieList] = useState<Array<IMovie>>(initialState);

  const store = useSelector<RootState, IMovieListStore>(state => ({
    allMovies: state.movie.allMovies,
    watchlist: {
      data: state.account.watchlist,
      isFetching: state.account.isFetchingWatchlist,
    },
    sessionId: state.auth.sessionId,
  }));

  useEffect(() => {
    if (store.allMovies && store.allMovies.length > 0) {
      store.allMovies.sort(
        (x: IMovie, y: IMovie) =>
          new Date(y.release_date).getTime() -
          new Date(x.release_date).getTime()
      );

      setMovieList(prev => prev.concat(store.allMovies as Array<IMovie>));
      document.documentElement.scrollTop += 1000;
    }
  }, [store.allMovies]);

  const renderImage = (path?: string, altText?: string) => {
    const localPath = path
      ? getImageURL(path)
      : getNotFoundImage('400x600/F4F4F4', altText || '');

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
    }
  };

  const getWatchlistButton = (item: IMovie) => {
    if (store.sessionId) {
      const isLoading = store.watchlist.isFetching;
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
    <Grid container className={classes.container}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {movieList &&
          movieList.map((item: IMovie) => {
            const voteAverage = item.vote_average ? item.vote_average / 2 : 0;
            return (
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
                    <Box>
                      <Box className={classes.itemTitle}>{item.title}</Box>
                      <Box className={classes.movieRate}>
                        <StyledRating
                          size={'small'}
                          value={voteAverage}
                          precision={0.5}
                          emptyIcon={<StarBorder fontSize="inherit" />}
                          readOnly
                        />
                        <Box className={classes.movieRateText}>
                          ({voteAverage}/5 in {item.vote_count} reviews)
                        </Box>
                      </Box>
                      <Box className={classes.movieSinopse}>
                        {item.overview ||
                          'No additional info was found for this movie.'}
                      </Box>
                    </Box>
                    <Box>
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
                </Box>
              </label>
            );
          })}
      </Masonry>
      <Grid item xs={12} className={classes.loader}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default MovieList;
