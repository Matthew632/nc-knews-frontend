import React, { Component } from "react";
import SortBy from "./SortBy";
import Filter from "./Filter.js";
import { fetchArticles } from "./api";
import { Link } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import { dateConvert } from "../utils";

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
            <Col>Created</Col>
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
                <Col>{dateConvert(art.created_at)}</Col>
              </Row>
            ))}
        </Container>
      </div>
    );
  }
  componentDidMount = () => {
    const propsTopic = this.props.topic;
    let topicVal = null;
    if (propsTopic !== "all") {
      topicVal = `${this.props.topic}`;
    }
    fetchArticles(topicVal, 1).then(data => {
      this.setState({ articles: data.articles, topic: topicVal });
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.sortChange) {
      fetchArticles(
        this.state.topic,
        this.state.page,
        this.state.sort_by,
        this.state.author
      ).then(data => {
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
    let topVal = this.state.topic;
    if (key === "author") {
      topVal = null;
    }
    const value = event.target.id;
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
      sortChange: true,
      topic: topVal
    }));
  };
}

export default Articles;
