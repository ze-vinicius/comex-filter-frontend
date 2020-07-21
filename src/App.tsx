import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from "./pages/Home";
import TableView from './pages/TableView';

import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/table/view" component={TableView} />
      </Switch>
    </Router>
  )
}

export default App;
