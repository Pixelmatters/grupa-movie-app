import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  Grid,
  Box,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { IMovie } from '../../api/models';
import Masonry from 'react-masonry-css';

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
    width: '100%',
    height: 0,
    bottom: '4px',
    backgroundColor: 'rgba(72, 72, 72, 0.84)',
    color: theme.palette.primary.contrastText,
    boxSizing: 'border-box',
  },
  itemWrapper: {
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '1rem',
    '&:hover': {
      '& > div': {
        height: '17.5rem',
        transition: 'height 1s ease',
        padding: '0.5rem',
        transform: 'translateZ(0)',
      },
      '& > img': {
        filter: 'grayscale(80%)',
      },
    },
  },

  itemTitle: {
    fontSize: '1rem',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  movieImage: {
    animation: '$fadeIn ease 5s',
  },

  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const breakpointColumnsObj = {
  default: 5,
  2095: 4,
  1727: 3,
  1305: 2,
  858: 1,
};

const MovieList: FunctionComponent = () => {
  const classes = useStyles();
  const initialState: Array<IMovie> = [];

  const [movieList, setMovieList] = useState<Array<IMovie>>(initialState);

  const moreRecentList: [IMovie] = useSelector(
    (state: RootState) => state.movie.popular
  ) as [IMovie];

  useEffect(() => {
    if (moreRecentList?.length > 0) {
      setMovieList(prev => prev.concat(moreRecentList));
      document.documentElement.scrollTop += 1000;
    }
  }, [moreRecentList]);

  return (
    <Grid container className={classes.container}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {movieList &&
          movieList.map((item: any) => (
            <Box key={item.id} className={classes.itemWrapper}>
              <img
                className={classes.movieImage}
                height="600"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
              <Box className={classes.info}>
                <Box component="h5" className={classes.itemTitle}>
                  {item.title}
                </Box>
                <Box component="span">{item.overview}</Box>
              </Box>
            </Box>
          ))}
      </Masonry>
      <Grid item xs={12} className={classes.loader}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default MovieList;
