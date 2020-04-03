import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import MovieList from './Component/Movielist';
import DetailMovie from './Component/DetailMovie';

function App() {
  return (
    <div className="App"  >
      <Router>
      <Route exact path="/" component={MovieList} />
      <Route path="/movie/:id" component={DetailMovie}/>
      </Router> 
    </div>
  );
}

export default App;
