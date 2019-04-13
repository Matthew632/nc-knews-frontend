import React, { Component } from "react";
import { postComment } from "../api";
import { navigate } from "@reach/router";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class CommentForm extends Component {
  state = { userInput: "" };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container className="addComment">
          <Row>
            <Col>
              <Form.Control
                type="textarea"
                value={this.state.userInput}
                name="addComment"
                id={"addComment"}
                onChange={this.handleChange}
                required
                placeholder="Comment..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit" value="Add">
                Add
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    postComment(this.props.articleId, {
      username: this.props.user,
      body: this.state.userInput
    })
      .then(() => {
        this.props.setChange();
        this.setState({ userInput: "" });
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
  };
}

export default CommentForm;
