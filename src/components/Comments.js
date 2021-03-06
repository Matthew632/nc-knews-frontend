import React, { Component } from "react";
import CommentVote from "./CommentVote";
import { fetchData, patchVote, deleteComment } from "../api";
import { Container, Row, Col, Button } from "react-bootstrap";
import { navigate } from "@reach/router";

class Comments extends Component {
  state = {
    comments: null,
    change: false
  };
  render() {
    return (
      <div>
        {this.state.comments && (
          <div>
            <Container className="addCommentContainer">
              <Row>
                <Col className="addCommentHeader">
                  <h5>Comments</h5>
                </Col>
              </Row>
              {this.state.comments.map(com => (
                <div key={com.comment_id}>
                  <Row className="commentDivider">
                    <Col>{com.author}</Col>
                  </Row>
                  <Row>
                    <Col>{com.body}</Col>
                  </Row>
                  <Row className="bottomMarginHalf">
                    <Col>
                      <div>
                        <span className="rightMargin">
                          Votes:{" "}
                          {com.votes +
                            (this.state[`key${com.comment_id}`] || 0)}
                        </span>
                        <CommentVote com={com} handleClick={this.handleClick} />
                      </div>
                    </Col>
                  </Row>
                  {com.author === this.props.user && (
                    <Row className="bottomMarginHalf">
                      <Col>
                        <Button
                          variant="danger"
                          id={`${com.comment_id}`}
                          onClick={this.handleDelete}
                        >
                          Remove Comment
                        </Button>
                      </Col>
                    </Row>
                  )}
                </div>
              ))}
            </Container>
          </div>
        )}
      </div>
    );
  }

  componentDidMount = () => {
    fetchData(`/articles/${this.props.articleId}/comments`)
      .then(data => {
        this.setState({ comments: data.comments });
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
    const id = `key${event.target.id.slice(10)}`;
    patchVote(event.target.id)
      .then(
        this.setState(prevState => ({
          ...prevState,
          [id]: 1
        }))
      )
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

  componentDidUpdate(prevState) {
    if (this.state.change || this.props.addComment) {
      fetchData(`/articles/${this.props.articleId}/comments`)
        .then(data => {
          this.setState(prevState => ({
            ...prevState,
            comments: data.comments,
            change: false
          }));
          this.props.setFalse();
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
    }
  }

  handleDelete = event => {
    const id = event.target.id;
    deleteComment(id)
      .then(data => {
        if (data.status === 204) {
          this.setState(prevState => ({ ...prevState, change: true }));
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

export default Comments;
