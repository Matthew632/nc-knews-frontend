import React, { Component } from "react";
import { postArticle, fetchData, postTopic } from "./api";
import { Dropdown, Container, Col, Row } from "react-bootstrap";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyInput: "",
      titleInput: "",
      topics: null,
      topic: null,
      newTopic: false,
      newTopicTitle: null,
      newTopicDescription: null
    };

    this.handleNewTopic = this.handleNewTopic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Container>
          <Row>
            <Col>Add Article</Col>
          </Row>
          <Row>
            <Col>Title</Col>
            <Col>
              <input
                type="text"
                name="addTitle"
                id="addTitle"
                value={this.state.titleInput}
                onChange={this.handleTitleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>Article text</Col>
            <Col>
              <textarea
                value={this.state.bodyInput}
                name="addArticle"
                id="addArticle"
                onChange={this.handleChange}
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
              <input type="submit" value="Submit" />
            </Col>
          </Row>
          {this.state.newTopic && (
            <div>
              <Row>
                <Col>Topic</Col>
                <Col>
                  <input
                    type="text"
                    onChange={this.handleTopicChange}
                    value={this.state.newTopicTitle}
                  />
                </Col>
              </Row>
              <Row>
                <Col>Topic Description</Col>
                <Col>
                  <input
                    type="text"
                    onChange={this.handleDescriptionChange}
                    value={this.state.newTopicDescription}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </form>
    );
  }
  componentDidMount = () => {
    fetchData("/topics").then(data => {
      this.setState({ topics: data.topics });
    });
  };

  handleChange(event) {
    this.setState({ bodyInput: event.target.value });
  }

  handleTopicChange(event) {
    this.setState({ newTopicTitle: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ newTopicDescription: event.target.value });
  }

  handleNewTopic() {
    this.setState({ newTopic: true });
  }

  handleTopicClick = event => {
    const pref = event.target.id;
    this.setState(prevState => ({ ...prevState, topic: pref }));
  };

  handleTitleChange(event) {
    this.setState({ titleInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    Promise.all([
      postArticle({
        username: "cooljmessy",
        body: this.state.bodyInput,
        topic: this.state.topic,
        title: this.state.titleInput
      }),
      postTopic({
        slug: this.state.newTopicTitle,
        description: this.state.newTopicDescription
      })
    ]).then(
      this.setState({
        bodyInput: "",
        titleInput: "",
        topic: null,
        newTopic: false,
        newTopicTitle: null,
        newTopicDescription: null
      })
    );
  }
  // could error handle the above for non-unique slugs
}

export default AddArticle;
