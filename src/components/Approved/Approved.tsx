import React, { useEffect, FunctionComponent } from 'react';
import queryString from 'query-string';
import { Location } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { requestSessionId } from '../../store/auth/thunks';
import { RootState } from '../../store/store';
type ApprovedProps = {
  location: Location;
};

const Approved: FunctionComponent<ApprovedProps> = ({
  location,
}: ApprovedProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryStrings = queryString.parse(location.search);
    const requestToken = queryStrings.request_token;
    const approved = queryStrings.approved;

    if (approved && (requestToken as string)) {
      dispatch(requestSessionId(requestToken as string));
    }
  }, [dispatch, location.search]);

  const authState = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <p>The session id is: {authState.sessionId} </p>
    </div>
  );
};

export default Approved;
