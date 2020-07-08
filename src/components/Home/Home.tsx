import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import headerBg from '../../assets/images/header-bg.jpg';
import Header from '../Header/Header';
import './Home.css';
import MovieList from '../MovieList/MovieList';
import { useDispatch } from 'react-redux';
import { fetchPopular } from '../../store/movie/thunks';

const useStyles = makeStyles(styles => ({
  root: {
    flexGrow: 1,
    fontFamily: styles.typography.fontFamily,
    width: '100%'
  },
  header: {
    backgroundImage: `url(${headerBg})`,
    width: '100%',
    height: '10rem'
  },
  mainContainer: {
    marginTop: '2rem'
  }
}));

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchPopular());

  }, [dispatch]);


  return (
    <div className={classes.root}>
      <Grid xs={12} item >
        <Grid className={classes.header}>
          <Header />
        </Grid>

        <Grid item xs={12} sm={12} className={classes.mainContainer}>
          <main>
            <Grid item xs={12} sm={12}>
              <div className="slider">carrousel</div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MovieList />
            </Grid>
          </main>
        </Grid>
      </Grid>

    </div>
  );
}


export default Home;
