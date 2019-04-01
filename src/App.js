import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router";
import HomeView from './components/HomeView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link> <Link to="/blocks">All Articles</Link>
        </nav>
        <Router>
          <HomeView path="/" />
        </Router>
      </div>
    );
  }
}

export default App;
