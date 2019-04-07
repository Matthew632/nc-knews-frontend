import React, { Component } from "react";
import { postArticle, fetchData, postTopic } from "../api";
import { Dropdown, Container, Col, Row, Form, Button } from "react-bootstrap";
import { navigate } from "@reach/router";

class AddArticle extends Component {
  state = {
    bodyInput: "",
    titleInput: "",
    topics: null,
    topic: null,
    newTopic: false,
    newTopicTitle: null,
    newTopicDescription: null
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container>
          <Row>
            <Col>
              <h3>Add Article</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="titleInput"
                id="addTitle"
                value={this.state.titleInput}
                onChange={this.handleChange}
                required
                placeholder="Title..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.bodyInput}
                name="bodyInput"
                id="addArticle"
                onChange={this.handleChange}
                required
                placeholder="Article..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  {this.state.topic || "Topic?"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.topics &&
                    this.state.topics.map(top => (
                      <Dropdown.Item
                        value={`${top.slug}`}
                        onClick={this.handleChange}
                        name="topic"
                      >
                        {top.slug}
                      </Dropdown.Item>
                    ))}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.handleNewTopic}>
                    New topic
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
          {this.state.newTopic && (
            <div>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.newTopicTitle}
                    placeholder="Topic title..."
                    required
                    name="newTopicTitle"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.newTopicDescription}
                    placeholder="Topic description..."
                    required
                    name="newTopicDescription"
                  />
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </Form>
    );
  }
  componentDidMount = () => {
    fetchData("/topics")
      .then(data => {
        this.setState({ topics: data.topics });
      })
      .catch(error => {
        navigate("/error", {
          replace: true,
          state: {
            code: error.response.status,
            message: error.response.data.msg,
            from: "/"
          }
        });
      });
  };

  handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  handleNewTopic = () => {
    this.setState({ newTopic: true });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.newTopic) {
      postTopic({
        slug: this.state.newTopicTitle,
        description: this.state.newTopicDescription
      })
        .then(data =>
          this.setState(prevState => ({ ...prevState, topic: prevState.topic }))
        )
        .catch(error => {
          navigate("/error", {
            replace: true,
            state: {
              code: error.response.status,
              message: error.response.data.msg,
              from: "/"
            }
          });
        });
    }
    postArticle({
      username: this.props.user,
      body: this.state.bodyInput,
      topic: this.state.topic,
      title: this.state.titleInput
    })
      .then(data => {
        if (data.status === 201) {
          navigate(`/article/${data.data.article.article_id}`);
        }
      })
      .catch(error => {
        navigate("/error", {
          replace: true,
          state: {
            code: error.response.status,
            message: error.response.data.msg,
            from: "/"
          }
        });
      });
  };
}

export default AddArticle;
