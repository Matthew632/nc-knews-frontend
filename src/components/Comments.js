import React, { Component } from "react";
import { fetchData, patchVote, deleteComment } from "./api";
import { Container, Row, Col, Button } from "react-bootstrap";

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
            <Container>
              <Row>
                <Col>Comments</Col>
              </Row>
              {this.state.comments.map(com => (
                <div>
                  <Row>
                    <Col>{com.author}</Col>
                  </Row>
                  <Row>
                    <Col>{com.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <div>
                        <span>
                          Votes:{" "}
                          {com.votes +
                            (this.state[`key${com.comment_id}`] || 0)}
                        </span>
                        <Button
                          key={`key${com.comment_id}`}
                          variant="primary"
                          id={`/comments/${com.comment_id}`}
                          onClick={this.handleClick}
                          disabled={this.state[`key${com.comment_id}`]}
                        >
                          Approve
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  {com.author === this.props.user && (
                    <Row>
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
    fetchData(`/articles/${this.props.articleId}/comments`).then(data => {
      this.setState({ comments: data.comments });
    });
  };

  handleClick = event => {
    const id = `key${event.target.id.slice(10)}`;
    patchVote(event.target.id).then(
      this.setState(prevState => ({
        ...prevState,
        [id]: 1
      }))
    );
  };

  componentDidUpdate(prevState) {
    if (this.state.change) {
      fetchData(`/articles/${this.props.articleId}/comments`).then(data => {
        this.setState(prevState => ({
          ...prevState,
          comments: data.comments,
          sortChange: false
        }));
      });
    }
  }

  handleDelete = event => {
    const id = event.target.id;
    deleteComment(id).then(data => {
      if (data.status === 204) {
        this.setState(prevState => ({ ...prevState, change: true }));
      }
    });
  };
}

export default Comments;
