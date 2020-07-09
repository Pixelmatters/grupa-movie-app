import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { makeStyles, Theme, GridListTile, GridList } from '@material-ui/core';
import { IMovie } from '../../api/models';
import { useHistory } from 'react-router-dom';
import { getImageURL, getNotFoundImage } from '../../api/api';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  movieImage: {
    animation: '$fadeIn ease 3s',
    width: 200,
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

const PopularSlider: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  const popular = useSelector((state: RootState) => state.movie.popular);

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
    <div className={classes.root}>
      <GridList cellHeight={'auto'} cols={5} className={classes.container}>
        {popular &&
          popular.map((item: IMovie) => (
            <GridListTile
              key={item.id}
              onClick={() => openMovieDetails(item.id)}
            >
              {renderImage(item.poster_path, item.title)}
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default PopularSlider;
