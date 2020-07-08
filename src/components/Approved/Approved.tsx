import React, { useEffect, FunctionComponent } from 'react';
import queryString from 'query-string';
import { Location } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { requestSessionId } from '../../store/auth/thunks';
import { RootState } from '../../store/store';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  if (authState.sessionId) {
    history.push('/');
  }

  return (
    <div>
      <p>Authenticating</p>
    </div>
  );
};

export default Approved;
