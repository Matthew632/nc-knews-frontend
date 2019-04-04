import React, { Component } from "react";
import { fetchData, patchVote } from "./api";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Button from "react-bootstrap/Button";

class Article extends Component {
  state = {
    article: null,
    vote: 0
  };

  render() {
    return (
      <div>
        {this.state.article && (
          <div>
            <h2>{this.state.article.title}</h2>
            <p>{`By ${this.state.article.author}`}</p>
            <p>{`${this.state.article.created_at.slice(
              8,
              10
            )}-${this.state.article.created_at.slice(
              5,
              8
            )}${this.state.article.created_at.slice(0, 4)}`}</p>
            <p>{this.state.article.body}</p>
            <p>
              <span>{this.state.article.votes + this.state.vote}</span>
              <Button
                variant="primary"
                id={`/articles/${this.props.id}`}
                onClick={this.handleClick}
                disabled={this.state.vote !== 0}
              >
                Vote
              </Button>
            </p>
          </div>
        )}
        <CommentForm types="Comment" articleId={this.props.id} />
        <Comments articleId={this.props.id} />
      </div>
    );
  }

  componentDidMount = () => {
    fetchData(`/articles/${this.props.id}`).then(data => {
      this.setState({ article: data.article });
    });
  };

  handleClick = event => {
    patchVote(event.target.id).then(
      this.setState(prevState => ({ ...prevState, vote: 1 }))
    );
  };
}

export default Article;
