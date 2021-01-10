import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';

import ThemeProvider from './context/theme/index';
import Stats from './components/Stats/Stats';
import GetTested from './components/GetTested/GetTested';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Stats />
            </Route>
            <Route exact path="/get-tested">
              <GetTested />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
