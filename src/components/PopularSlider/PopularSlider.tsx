import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { makeStyles, GridListTile, GridList } from '@material-ui/core';
import { IMovie } from '../../api/models';
import { useHistory } from 'react-router-dom';
import { getImageURL, getNotFoundImage } from '../../api/api';
import { fetchPopular } from '../../store/movie/thunks';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import headerBg from '../../assets/images/header-bg.jpg';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${headerBg})`,
    backgroundPosition: '0px -128px',
  },
  container: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    padding: '2rem',
  },
  movieImage: {
    animation: '$fadeIn ease 3s',
    width: 300,
    cursor: 'pointer',
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

const getGridListCols = (width: Breakpoint) => {
  if (isWidthUp('xl', width)) {
    return 5;
  }

  if (isWidthUp('lg', width)) {
    return 4;
  }

  if (isWidthUp('md', width)) {
    return 2;
  }

  return 1;
};

type PopularSliderProps = {
  width: Breakpoint;
};

const PopularSlider: FunctionComponent<PopularSliderProps> = (
  props: PopularSliderProps
) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const popular = useSelector((state: RootState) => state.movie.popular);

  useEffect(() => {
    dispatch(fetchPopular());
  }, [dispatch]);

  const openMovieDetails = (id: number) => {
    history.push(`/movie/${id}`);
  };

  const renderImage = (callback: Function, path?: string, altText?: string ) => {
    const localPath = path
      ? getImageURL(path)
      : getNotFoundImage('400x600/FFFFFF', altText || '');

    return <img className={classes.movieImage} src={localPath} alt={altText} onClick={() => callback()} />;
  };
  return (
    <div className={classes.root}>
      {popular && (
        <GridList
          cellHeight={'auto'}
          cols={getGridListCols(props.width)}
          className={classes.container}
        >
          {popular.map((item: IMovie) => (
            <GridListTile
              key={item.id}
            >
              {renderImage(() => openMovieDetails(item.id), item.poster_path, item.title)}
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
};

export default withWidth()(PopularSlider);
