import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
const Home = lazy(() => import('../Home/Home'));
const Movie = lazy(() => import('../Movie/Movie'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie/:movieId" component={Movie} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default connect()(App);
