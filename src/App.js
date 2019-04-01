import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router";
import HomeView from './components/HomeView';
import Article from './components/Article';
import Articles from './components/Articles';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link> <Link to="/articles">All Articles</Link>
        </nav>
        <Router>
          <HomeView path="/" />
          <Article path="/article" />
          <Articles path="/articles" />
        </Router>
      </div>
    );
  }
}

export default App;
