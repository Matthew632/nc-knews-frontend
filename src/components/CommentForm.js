import React, { Component } from "react";
import { postComment } from "../api";
import { navigate } from "@reach/router";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userInput: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for={"addComment"}>Add a comment:</label>
        <textarea
          value={this.state.userInput}
          name="addComment"
          id={"addComment"}
          onChange={this.handleChange}
          required
        />
        <input type="submit" value="Add" />
      </form>
    );
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    postComment(this.props.articleId, {
      username: this.props.user,
      body: this.state.userInput
    })
      .then(this.props.setChange, this.setState({ userInput: "" }))
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

export default CommentForm;
