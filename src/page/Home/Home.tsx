import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';
import headerBg from '../../assets/images/header-bg.jpg';
import Header from '../../components/Header/Header';
import { fetchAllMovies } from '../../store/movie/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { fetchWatchList } from '../../store/account/thunks';
import { RootState } from '../../store/store';

const PopularSlider = lazy(() =>
  import('../../components/PopularSlider/PopularSlider')
);
const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

const useStyles = makeStyles(styles => ({
  root: {
    flexGrow: 1,
    fontFamily: styles.typography.fontFamily,
    width: '100%',
  },
  header: {
    position: 'fixed',
    backgroundImage: `url(${headerBg})`,
    width: '100%',
    height: '8rem',
    top: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  mainContainer: {
    marginTop: '8rem',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Roboto, arial',
    color: styles.palette.primary.dark,
    paddingBottom: '2rem',
  },
  centerLoading: {
    textAlign: 'center',
  },
  popularSlider: {
    marginBottom: '4rem',
  },
}));

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);

  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchWatchList(sessionId));
    }
  });

  const fetchMovies = () => {
    const number = pageNumber + 1;
    setPageNumber(number);
    dispatch(fetchAllMovies(number));
  };

  return (
    <div className={classes.root}>
      <Grid xs={12} item>
        <Grid className={classes.header}>
          <Header />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.mainContainer}>
          <main>
            <Grid item className={classes.popularSlider}>
              <PopularSlider />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Suspense
                fallback={<Box className={classes.centerLoading}>Loading</Box>}
              >
                <Grid item component="h1" className={classes.title}>
                  Recent Movies
                </Grid>
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
