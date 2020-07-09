import React, { lazy, Suspense, useState } from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';
import headerBg from '../../assets/images/header-bg.jpg';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { fetchPopular } from '../../store/movie/thunks';
import { Waypoint } from 'react-waypoint';
import './Home.css';

const MovieList = lazy(() => import('../MovieList/MovieList'));

const useStyles = makeStyles(styles => ({
  root: {
    flexGrow: 1,
    fontFamily: styles.typography.fontFamily,
    width: '100%',
  },
  header: {
    backgroundImage: `url(${headerBg})`,
    width: '100%',
    height: '8rem',
    position: 'fixed',
    top: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  mainContainer: {
    marginTop: '11rem',
  },
  centerLoading: {
    textAlign: 'center',
  },
}));

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);

  const fetchMovies = () => {
    const number = pageNumber + 1;
    setPageNumber(number);
    dispatch(fetchPopular(number));
  };

  return (
    <div className={classes.root}>
      <Grid xs={12} item >
        <Grid className={classes.header}>
          <Header />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.mainContainer}>
          <main>
            <Grid item xs={12} sm={12}>
              <Suspense fallback={<Box className={classes.centerLoading}>Loading</Box>}>
                <MovieList />
              </Suspense>
            </Grid>
          </main>
        </Grid>
        <Waypoint onEnter={fetchMovies} />
      </Grid>
    </div>
  );
}

export default Home;
