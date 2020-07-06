import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RootState } from './store/store';
import { fetchLatest } from './store/movies/thunks';
import { connect, ConnectedProps } from 'react-redux';

const mapState = (state: RootState) => ({
  movies: state.movies,
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
          <p>{this.props.movies.isFetching ? 'Loading' : 'Done'}</p>
          <p>{this.props.movies.latest?.title}</p>
          <p>{this.props.movies.error}</p>
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
