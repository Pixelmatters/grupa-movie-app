import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import headerBg from '../../assets/images/header-bg.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './App.css';

const useStyles = makeStyles(styles => ({
  root: {
    flexGrow: 1,
    fontFamily: styles.typography.fontFamily,
  },
  backgroundTop: {
    backgroundImage: `url(${headerBg})`
  },
  mainContainer: {
    marginTop: '2rem'
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.backgroundTop}>
        <Header />

        <Grid item xs={12} sm={12} className={classes.mainContainer}>
          <main>
            <Grid item xs={12} sm={12}>
              <div className="slider">
                carrousel
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              Content
            </Grid>
          </main>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default App;
