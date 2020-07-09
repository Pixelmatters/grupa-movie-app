import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ICast } from '../../api/models';
import { makeStyles } from '@material-ui/core';
import { getImageURL } from '../../api/api';

const useStyles = makeStyles(() => ({
  castWrapper: {
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
    maxWidth: '200px',
  },
  classMemberName: {
    fontWeight: 'bold',
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
              src={getImageURL(castMember.profile_path)}
            />
            <div className={classes.memberTextWrapper}>
              <span className={classes.classMemberName}>{castMember.name}</span>
              <span>{castMember.character}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CastList;
