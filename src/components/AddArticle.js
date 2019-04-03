// title;
// body;
// topic;
// username;

import React, { Component } from "react";
import { postArticle } from "./api";

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
        <label for={"addArticle"}>Add an article:</label>
        <textarea
          value={this.state.userInput}
          name="addArticle"
          id={"addArticle"}
          onChange={this.handleChange}
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
    postArticle({
      username: "cooljmessy",
      body: this.state.userInput,
      topic: "coding",
      title: "Testing"
    }).then(this.setState({ userInput: "" }));
  }
}

export default CommentForm;
