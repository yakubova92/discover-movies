import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import { MovieList, MovieDetails } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MovieList} />
        <Route path="/movies/:movieId" exact component={MovieDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
