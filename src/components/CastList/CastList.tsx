import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ICast } from '../../api/models';
import { makeStyles } from '@material-ui/core';
import { getImageURL, getNotFoundImage } from '../../api/api';

const useStyles = makeStyles(() => ({
  castWrapper: {
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    maxWidth: '2080px',
    margin: '0 auto',
    textAlign: 'center',
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
  const renderImage = (path?: string, altText?: string) => {
    const localPath = path
      ? getImageURL(path)
      : getNotFoundImage('200x300/F4F4F4', altText || '');

    return (
      <img className={classes.castMemberImg} alt={altText} src={localPath} />
    );
  };
  return (
    <div className={classes.castWrapper}>
      {castData.map((castMember: ICast) => {
        return (
          <div className={classes.memberWrapper} key={castMember.cast_id}>
            {renderImage(castMember.profile_path, 'No image')}
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
