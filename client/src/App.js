import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import MovieList from './pages/MovieList'
import MovieDetails from './pages/MovieDetails';

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
