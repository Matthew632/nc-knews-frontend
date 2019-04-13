import React, { Component } from "react";
import { postArticle, fetchData, postTopic } from "../api";
import { Dropdown, Container, Col, Row, Form, Button } from "react-bootstrap";
import { navigate } from "@reach/router";
import "../style.css";

class AddArticle extends Component {
  state = {
    bodyInput: "",
    titleInput: "",
    topics: null,
    topic: null,
    newTopic: false,
    newTopicTitle: "",
    newTopicDescription: ""
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container className="addArticle">
          <Row>
            <Col className="addArticleHeader">
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
            <Col className="articleBody">
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
          {this.state.newTopic && (
            <div>
              <Row>
                <Col>
                  <Form.Control
                    data-cy="newTopicInput"
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
                    data-cy="newTopicInput"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.newTopicDescription}
                    placeholder="Topic description..."
                    required
                    name="newTopicDescription"
                    className="articleBody"
                  />
                </Col>
              </Row>
            </div>
          )}
          <Row className="bottomMargin">
            <Col>
              <Dropdown>
                <Dropdown.Toggle
                  data-cy="addTopic"
                  variant="info"
                  id="dropdown-basic"
                >
                  {this.state.topic || "Topic?"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.topics &&
                    this.state.topics.map(top => (
                      <Dropdown.Item
                        key={`${top.slug}`}
                        id={`${top.slug}`}
                        value={`${top.slug}`}
                        onClick={this.handleTopicChange}
                        name="topic"
                      >
                        {top.slug}
                      </Dropdown.Item>
                    ))}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    data-cy="newTopic"
                    onClick={this.handleNewTopic}
                  >
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
    const value = event.target.value;
    const key = event.target.name;
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  handleTopicChange = event => {
    const value = event.target.id;
    this.setState(prevState => ({
      ...prevState,
      topic: value,
      newTopic: null
    }));
  };

  handleNewTopic = () => {
    this.setState({ newTopic: true, topic: null });
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
