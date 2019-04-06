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
                name="addTitle"
                id="addTitle"
                value={this.state.titleInput}
                onChange={this.handleTitleChange}
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
                name="addArticle"
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
                        id={`${top.slug}`}
                        onClick={this.handleTopicClick}
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
                    onChange={this.handleTopicChange}
                    value={this.state.newTopicTitle}
                    placeholder="Topic title..."
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={this.handleDescriptionChange}
                    value={this.state.newTopicDescription}
                    placeholder="Topic description..."
                    required
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
    this.setState({ bodyInput: event.target.value });
  };

  handleTopicChange = event => {
    this.setState({ newTopicTitle: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ newTopicDescription: event.target.value });
  };

  handleNewTopic = () => {
    this.setState({ newTopic: true });
  };

  handleTopicClick = event => {
    const pref = event.target.id;
    this.setState(prevState => ({ ...prevState, topic: pref }));
  };

  handleTitleChange = event => {
    this.setState({ titleInput: event.target.value });
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
