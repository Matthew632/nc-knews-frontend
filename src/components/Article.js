import React, { Component } from "react";
import { fetchData, patchVote, deleteArticle } from "../api";
import { navigate } from "@reach/router";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Button from "react-bootstrap/Button";
import { dateConvert } from "../utils";

class Article extends Component {
  state = {
    article: null,
    vote: 0
  };

  setChange = () => {
    this.setState(prevState => ({ ...prevState }));
  };

  render() {
    console.log("in the article render");
    return (
      <div>
        {this.state.article && (
          <div>
            <h2>{this.state.article.title}</h2>
            <p>{`By ${this.state.article.author}`}</p>
            <p>{dateConvert(this.state.article.created_at)}</p>
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
        {this.state.article && (
          <Comments user={this.props.user} articleId={this.props.id} />
        )}
      </div>
    );
  }

  componentDidMount = () => {
    fetchData(`/articles/${this.props.id}`)
      .then(data => {
        this.setState({ article: data.article });
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

  handleClick = event => {
    patchVote(event.target.id)
      .then(this.setState(prevState => ({ ...prevState, vote: 1 })))
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

  handleDelete = event => {
    deleteArticle(this.state.article.article_id)
      .then(data => {
        if (data.status === 204) {
          navigate("/");
        }
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

export default Article;
