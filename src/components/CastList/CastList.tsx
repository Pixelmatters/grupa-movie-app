import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ICast } from '../../api/models';
import './CastList.css';

const CastList: FunctionComponent = () => {
  const castData: [ICast] = useSelector(
    (state: RootState) => state.cast.cast
  ) as [ICast];
  if (castData === undefined) {
    return <p>Loading..,</p>;
  }
  return (
    <div className="cast-wrapper">
      {castData.slice(0, 10).map((castMember: ICast) => {
        return (
          <div className="member-wrapper" key={castMember.cast_id}>
            <img
              className="castMember-img"
              alt={castMember.name}
              src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
            />
            <div className="member-text-wrapper">
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
