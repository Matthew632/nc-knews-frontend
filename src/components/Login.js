import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { fetchData } from "./api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userInput: "guest", authors: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div>
            <p>Logged in as {this.props.user}</p>
            <Button variant="primary" id="logout" onClick={this.handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label for={"addUsername"}>Enter Username:</label>
            <input
              type="text"
              value={this.state.userInput}
              name="addUsername"
              id={"addUsername"}
              onChange={this.handleChange}
            />
            <input type="submit" value="Login" />
          </form>
        )}
      </div>
    );
  }

  componentDidUpdate(prevState) {
    console.log("in update");
    if (!this.props.user && !this.state.authors) {
      fetchData("/users").then(data => {
        this.setState(prevState => ({
          ...prevState,
          authors: data.users
        }));
      });
    }
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleLogout() {
    this.props.setUser(null);
  }

  handleSubmit(event) {
    const username = this.state.userInput;
    event.preventDefault();
    if (this.state.authors.some(user => user.username === username)) {
      this.props.setUser(username);
    }
    this.setState({ userInput: "guest" });
  }
}

export default Login;
