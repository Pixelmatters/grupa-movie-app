import React, { FunctionComponent } from 'react';
import {  useSelector,  } from 'react-redux';
import { RootState } from '../../store/store';
import { Grid, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
    marginLeft: '-30px', /* gutter size offset */
    width: 'auto',
  },
  masonryGridColumn: {
    paddingLeft: '30px', /* gutter size */
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
      }
    }
  },
  itemTitle: {
    fontSize: '1rem',
  }
}));

const breakpointColumnsObj = {
  default: 5,
  2095: 4,
  1727: 3,
  1305: 2,
  858: 1
};

const MovieList: FunctionComponent = () => {

  const list: any = useSelector((state: RootState) => state.movie.popular);
  const classes  = useStyles();
  
  return (
    <Grid container className={classes.container}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}>
        {list && list.map((item: any) => (
          <Box key={item.backdrop_path} className={classes.itemWrapper}>
            <img height="600" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
            <Box className={classes.info}>
              <Box component="h5" className={classes.itemTitle}>{item.title}</Box>
              <Box component="span">
                {item.overview}
              </Box>
            </Box>
          </Box>
        ))}
      </Masonry>
    </Grid>
  );
};

export default MovieList;
