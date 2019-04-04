import React, { Component } from "react";
import SortBy from "./SortBy";
import Filter from "./Filter.js";
import { getArticles, fetchArticles } from "./api";
import { Link } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";

class Articles extends Component {
  state = {
    articles: null,
    sort_by: null,
    author: null,
    sortChange: false,
    topic: null,
    page: 1
  };

  render() {
    let header = this.state.author
      ? `${this.state.author}'s Articles`
      : `${this.props.topic[0].toUpperCase()}${this.props.topic.slice(
          1
        )} Articles`;
    return (
      <div>
        <h2>{header}</h2>
        <SortBy handleClick={this.handleClick} />
        <Filter handleClick={this.handleClick} />
        <Container>
          <Row>
            <Col>Title</Col>
            <Col>Comments</Col>
            <Col>Votes</Col>
          </Row>
          {this.state.articles &&
            this.state.articles.map(art => (
              <Row>
                <Col>
                  <Link
                    to={`/article/${art.article_id}`}
                    key={`key${art.article_id}`}
                  >
                    {art.title}
                  </Link>
                </Col>
                <Col>{art.comment_count}</Col>
                <Col>{art.votes}</Col>
              </Row>
            ))}
        </Container>
      </div>
    );
  }
  componentDidMount = () => {
    console.log("in the mount");
    const propsTopic = this.props.topic;
    let topic = "";
    if (propsTopic !== "all") {
      topic = `${this.props.topic}`;
    }
    fetchArticles(topic, 1).then(data => {
      this.setState({ articles: data.articles, topic: propsTopic });
    });
  };

  componentDidUpdate(prevState) {
    console.log("in update");
    if (this.state.sortChange) {
      getArticles(this.state.sort_by).then(data => {
        this.setState(prevState => ({
          ...prevState,
          articles: data.articles,
          sortChange: false
        }));
      });
    }
  }

  handleClick = event => {
    const key = event.target.name;
    const value = event.target.id;
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
      sortChange: true
    }));
  };
}

export default Articles;
