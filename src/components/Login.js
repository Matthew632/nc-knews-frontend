import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userInput: "guest" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <p>Logged in as {this.props.user}</p>
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

  componentDidMount = () => {};

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
}

export default Login;
