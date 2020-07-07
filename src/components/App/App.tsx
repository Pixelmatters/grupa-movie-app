import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('../Home/Home'));

function App() {
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </Suspense>
      </Router>
    );
}

export default App;
