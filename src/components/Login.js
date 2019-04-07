import React, { Component } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { fetchData } from "../api";
import { navigate } from "@reach/router";
import "../style.css";

class Login extends Component {
  state = { userInput: "", authors: null, notValid: false };

  render() {
    return (
      <div>
        {this.props.user ? (
          <div>
            <Container>
              <Row>
                <Col>
                  <p>Logged in as {this.props.user}</p>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    id="logout"
                    onClick={this.handleLogout}
                  >
                    Log Out
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <Container>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <label for="addUsername">Enter Username:</label>
                  <Form.Control
                    className="username"
                    type="text"
                    value={this.state.userInput}
                    name="addUsername"
                    id="addUsername"
                    onChange={this.handleChange}
                    placeholder="'guest' is a valid username"
                  />
                  {this.state.notValid && (
                    <label for="addUsername" style={{ color: "red" }}>
                      Please enter a valid username
                    </label>
                  )}
                  <Button type="submit" value="Login">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }

  componentDidUpdate(prevState) {
    if (!this.props.user && !this.state.authors) {
      fetchData("/users")
        .then(data => {
          this.setState(prevState => ({
            ...prevState,
            authors: data.users
          }));
        })
        .catch(error => {
          navigate("/error", {
            replace: true,
            state: {
              code: error.response.status,
              message: error.response.data.msg,
              from: "/article"
            }
          });
        });
    }
  }

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  handleLogout = () => {
    this.props.setUser(null);
  };

  handleSubmit = event => {
    const username = this.state.userInput.toLowerCase();
    event.preventDefault();
    if (
      this.state.authors.some(user => user.username.toLowerCase() === username)
    ) {
      this.props.setUser(username);
      this.setState({ userInput: "" });
    } else {
      this.setState({ userInput: "", notValid: true });
    }
  };
}

export default Login;
