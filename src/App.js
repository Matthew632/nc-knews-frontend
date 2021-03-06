import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "./App.css";
import HomeView from "./components/HomeView";
import Article from "./components/Article";
import Articles from "./components/Articles";
import Login from "./components/Login";
import Error from "./components/Error";

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
          <Link to="/">Home</Link>{" "}
          <Link to="/articles" topic="all">
            All Articles
          </Link>
          <Login setUser={this.setUser} user={this.state.user} />
        </nav>
        <Router>
          <HomeView user={this.state.user} path="/" />
          <Article user={this.state.user} path="/article/:id" />
          <Articles path="/articles" />
          <Articles path="/articles/topic/:topic" />
          <Articles path="/articles/author/:author" />
          <Error path="/error" />
          <Error path="*" />
        </Router>
      </div>
    );
  }
}

export default App;
