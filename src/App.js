import React, { Component } from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import HomeView from "./components/HomeView";
import Article from "./components/Article";
import Articles from "./components/Articles";
import Login from "./components/Login";

class App extends Component {
  state = {
    user: "guest"
  };

  setUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link> <Link to="/articles/all">All Articles</Link>
          <Login setUser={this.setUser} user={this.state.user} />
        </nav>
        <Router>
          <HomeView user={this.state.user} path="/" />
          <Article user={this.state.user} path="/article/:id" />
          <Articles path="/articles/:topic" />
        </Router>
      </div>
    );
  }
}

export default App;
