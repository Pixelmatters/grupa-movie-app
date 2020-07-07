import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import footerBg from '../../assets/images/footer-bg.jpg';

const useStyles = makeStyles(styles => ({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundImage: `url(${footerBg})`,
    width: '100%',
    height: '10rem',
    color: styles.palette.primary.contrastText,
    textAlign: 'center',
  }
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} className={classes.footerContainer}>
      <div className="footer">
        Footer
      </div>
    </Grid>
  );
};

export default Footer;
