import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ICast } from '../../api/models';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  castWrapper: {
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  castMemberImg: {
    maxWidth: '200px',
    margin: '0 30px',
  },
  memberWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '30px',
  },
  memberTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    marginLeft: '30px',
  },
}));

const CastList: FunctionComponent = () => {
  const classes = useStyles();
  const castData: [ICast] = useSelector(
    (state: RootState) => state.cast.cast
  ) as [ICast];
  if (castData === undefined) {
    return <p>Loading..,</p>;
  }
  return (
    <div className={classes.castWrapper}>
      {castData.slice(0, 10).map((castMember: ICast) => {
        return (
          <div className={classes.memberWrapper} key={castMember.cast_id}>
            <img
              className={classes.castMemberImg}
              alt={castMember.name}
              src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
            />
            <div className={classes.memberTextWrapper}>
              <span>{castMember.name}</span>
              <span>{castMember.character}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CastList;
