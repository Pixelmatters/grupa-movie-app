import Header from '../Header/Header';
import { Grid } from '@material-ui/core';
import headerBg from '../../assets/images/header-bg.jpg';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, FunctionComponent } from 'react';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import CastList from '../CastList/CastList';
import { useDispatch } from 'react-redux';
import { fetchMovie } from '../../store/movie/thunks';
import { fetchCast } from '../../store/cast/thunks';
import { match, useRouteMatch } from 'react-router-dom';
import { IMatchParameters } from '../../api/models';
const useStyles = makeStyles(styles => ({
  mainWrapper: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: '40px'
  },
  sectionTitle: {
    textAlign: 'center'
  },
  root: {
    flexGrow: 1,
    fontFamily: styles.typography.fontFamily
  },
  backgroundTop: {
    backgroundImage: `url(${headerBg})`
  },
  mainContainer: {
    marginTop: '2rem'
  }
}));

const Movie: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matchData: match<IMatchParameters> = useRouteMatch() as match<
    IMatchParameters
  >;
  const movieId: number = Number(matchData.params.movieId);
  useEffect(() => {
    dispatch(fetchMovie(movieId));
    dispatch(fetchCast(movieId));
  }, [dispatch, movieId]);

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.backgroundTop}>
        <Header />

        <Grid item xs={12} sm={12} className={classes.mainContainer}>
          <main>
            <Grid item xs={12} sm={12}>
              <div className={classes.mainWrapper}>
                <MovieDisplay />
                <h2 className={classes.sectionTitle}>Movie cast</h2>
                <CastList />
              </div>
            </Grid>
          </main>
        </Grid>
      </Grid>
    </div>
  );
};

export default Movie;
