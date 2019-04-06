import React, { Component } from "react";
import { Button } from "react-bootstrap";

class CommentVote extends Component {
  state = {
    clicked: false
  };

  render() {
    return (
      <Button
        key={`key${this.props.com.comment_id}`}
        variant="primary"
        id={`/comments/${this.props.com.comment_id}`}
        onClick={this.handleVote}
        disabled={this.state.clicked}
      >
        Vote
      </Button>
    );
  }

  handleVote = event => {
    this.props.handleClick(event);
    this.setState({ clicked: true });
  };
}

export default CommentVote;
