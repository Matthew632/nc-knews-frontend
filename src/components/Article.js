import React, { Component } from "react";
import { fetchData, patchVote, deleteArticle } from "../api";
import { navigate } from "@reach/router";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Button, Container, Row, Col } from "react-bootstrap";
import { dateConvert } from "../utils";

class Article extends Component {
  state = {
    article: null,
    vote: 0,
    addComment: false
  };

  setChange = () => {
    this.setState(prevState => ({
      ...prevState,
      addComment: !prevState.addComment
    }));
  };

  setFalse = () => {
    this.setState(prevState => ({
      ...prevState,
      addComment: false
    }));
  };

  render() {
    return (
      <div>
        {this.state.article && (
          <div>
            <Container>
              <Row>
                <Col>
                  <h2>{this.state.article.title}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{`By ${this.state.article.author}`}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{dateConvert(this.state.article.created_at)}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{this.state.article.body}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    <span className="rightMargin">
                      Votes: {this.state.article.votes + this.state.vote}
                    </span>
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
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.props.user === this.state.article.author && (
                    <Button
                      variant="danger"
                      id="deleteButton"
                      onClick={this.handleDelete}
                    >
                      Delete Article
                    </Button>
                  )}{" "}
                </Col>
              </Row>
            </Container>
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
          <Comments
            addComment={this.state.addComment}
            setFalse={this.setFalse}
            user={this.props.user}
            articleId={this.props.id}
          />
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
            code: error.response ? error.response.status : "",
            message: error.response ? error.response.data.msg : "",
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
            code: error.response ? error.response.status : "",
            message: error.response ? error.response.data.msg : "",
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
            code: error.response ? error.response.status : "",
            message: error.response ? error.response.data.msg : "",
            from: "/article"
          }
        });
      });
  };
}

export default Article;
