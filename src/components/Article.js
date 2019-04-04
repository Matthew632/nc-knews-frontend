import React, { Component } from "react";
import { fetchData, patchVote, deleteArticle } from "./api";
import { navigate } from "@reach/router";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Button from "react-bootstrap/Button";

class Article extends Component {
  state = {
    article: null,
    vote: 0,
    change: false
  };

  setChange = () => {
    this.setState({ change: true });
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
              <span>Votes: {this.state.article.votes + this.state.vote}</span>
              {this.props.user && (
                <Button
                  variant="primary"
                  id={`/articles/${this.props.id}`}
                  onClick={this.handleClick}
                  disabled={this.state.vote !== 0}
                >
                  Vote
                </Button>
              )}
            </p>
            {this.props.user === this.state.article.author && (
              <Button
                variant="danger"
                id="deleteButton"
                onClick={this.handleDelete}
              >
                Delete Article
              </Button>
            )}
          </div>
        )}
        {this.props.user && (
          <CommentForm
            user={this.props.user}
            types="Comment"
            articleId={this.props.id}
            setChange={this.setChange}
          />
        )}
        <Comments user={this.props.user} articleId={this.props.id} />
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

  handleDelete = event => {
    deleteArticle(this.state.article.article_id).then(data => {
      if (data.status === 204) {
        navigate("/");
      }
    });
  };
}

export default Article;
