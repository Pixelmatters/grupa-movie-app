import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
const Home = lazy(() => import('../../page/Home/Home'));
const Movie = lazy(() => import('../../page/Movie/Movie'));
const Approved = lazy(() => import('../Approved/Approved'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie/:movieId" component={Movie} />
          <Route path="/approved/" component={Approved} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default connect()(App);
