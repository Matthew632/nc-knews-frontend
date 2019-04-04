import React, { Component } from "react";
import { fetchData, patchVote } from "./api";
import { Container, Row, Col, Button } from "react-bootstrap";

class Comments extends Component {
  state = {
    comments: null
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
                    <Col>User</Col>
                    <Col>{com.author}</Col>
                  </Row>
                  <Row>
                    <Col>Comment</Col>
                    <Col>{com.body}</Col>
                  </Row>
                  <Row>
                    <Col>Votes</Col>
                    <Col>
                      <div>
                        <span>
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
                </div>
              ))}
            </Container>
          </div>
        )}
      </div>
    );
  }

  // refactor the above convert date

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
}

export default Comments;
