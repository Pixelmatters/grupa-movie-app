import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RootState } from './store/store';
import { connect, ConnectedProps } from 'react-redux';
import { fetchLatest } from './store/movie/thunks';

const mapState = (state: RootState) => ({
  movie: state.movie,
});

const mapDispatch = {
  fetchLatestMovie: () => fetchLatest(),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchLatestMovie();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>{process.env.REACT_APP_API_KEY}</p>
          <p>
            {this.props.movie.isFetchingLatest
              ? 'Request Loading'
              : 'Request Finished'}
          </p>
          <p>{this.props.movie.latest?.title}</p>
          <p>{this.props.movie.failedFetchingLatest ? 'Request Failed' : ''}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connector(App);
