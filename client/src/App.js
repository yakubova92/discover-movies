import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Movies} />
        <Route path="/movies/:movieId" exact component={MovieDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
