import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  Grid,
  Box,
  CircularProgress,
  makeStyles,
  Theme,
  Button,
} from '@material-ui/core';
import { IMovie } from '../../api/models';
import Masonry from 'react-masonry-css';
import { PlaylistAdd, UnfoldMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getImageURL, getNotFoundImage } from '../../api/api';

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
    backgroundColor: 'rgba(72, 72, 72, 0.84)',
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
      '& ~ div': {
        height: '100%',
        transition: 'height 1s ease',
        padding: '0.5rem',
        transform: 'translateZ(0)',
      },
      '& ~ div ~ $movieRate': {
        opacity: 1,
      },
      '& ~ img': {
        filter: 'grayscale(80%)',
      },
    },
  },
  movieSinopse: {
    [theme.breakpoints.down('sm')]:{
      height: '10rem',
    },
  },
  itemTitle: {
    fontSize: '1rem',
  },
  movieImage: {
    animation: '$fadeIn ease 3s',
    transform: 'translateZ(0)',
    width: 400,
    height: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350,
      height: 500,
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardOptions: {
    display: 'flex',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    fontWeight: 800,
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
  1727: 3,
  1305: 2,
  858: 1,
};

const MovieList: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
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

  const renderImage = (path?: string, altText?: string) => {
    const localPath = path
      ? getImageURL(path)
      : getNotFoundImage('400x600/FFFFFF');

    return <img className={classes.movieImage} src={localPath} alt={altText} />;
  };

  const openMovieDetails = (id: number) => {
    history.push(`/movie/${id}`);
  };

  return (
    <Grid container className={classes.container}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {movieList &&
          movieList.map((item: IMovie) => (
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
                  <Box >
                    <Box className={classes.movieRate}>{item.vote_average}</Box>
                    <Box component="h5" className={classes.itemTitle}>
                      {item.title}
                    </Box>
                    <Box component="p" className={classes.movieSinopse}>
                      {item.overview}
                    </Box>
                  </Box>
                  <Box>
                    <Box className={classes.cardOptions}>
                      <Button
                        className={classes.buttonOptions}
                        onClick={() => openMovieDetails(item.id)}
                      >
                        <UnfoldMore /> See more
                      </Button>
                      <Button className={classes.buttonOptions}>
                        <PlaylistAdd /> Watch list
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </label>
          ))}
      </Masonry>
      <Grid item xs={12} className={classes.loader}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default MovieList;
