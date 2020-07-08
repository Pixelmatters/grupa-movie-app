import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('../Home/Home'));
const Approved = lazy(() => import('../Approved/Approved'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/approved/" component={Approved} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
