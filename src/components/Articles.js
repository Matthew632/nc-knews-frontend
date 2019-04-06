import React, { Component } from "react";
import SortBy from "./SortBy";
import Filter from "./Filter.js";
import Topics from "./Topics";
import { fetchArticles } from "../api";
import { Link, navigate } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import { dateConvert } from "../utils";

class Articles extends Component {
  state = {
    articles: null,
    sort_by: null,
    author: null,
    sortChange: false,
    authorChange: false,
    topicChange: false,
    topic: null,
    page: 1
  };

  render() {
    console.log("rendering");
    let header = this.state.author
      ? `${this.state.author}'s Articles`
      : this.props.topic
      ? `${this.props.topic[0].toUpperCase()}${this.props.topic.slice(
          1
        )} Articles`
      : "All Articles";
    return (
      <div>
        <h2>{header}</h2>
        <Container>
          <Row>
            <Col>
              <SortBy handleClick={this.handleClick} />
            </Col>
            <Col>
              <Filter />
            </Col>
            <Col>
              <Topics />
            </Col>
          </Row>
        </Container>
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
    let topicVal = this.props.topic ? this.props.topic : null;
    fetchArticles(topicVal)
      .then(data => {
        this.setState({
          articles: data.articles,
          topic: topicVal
        });
      })
      .catch(error => {
        navigate("/error", {
          replace: true,
          state: {
            code: error.response.status,
            message: error.response.data.msg,
            from: "/articles"
          }
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.author !== this.props.author) {
      this.setState(prevState => ({
        ...prevState,
        authorChange: true,
        author: this.props.author,
        topic: null
      }));
    }
    if (prevProps.topic !== this.props.topic) {
      this.setState(prevState => ({
        ...prevState,
        topicChange: true,
        topic: this.props.topic,
        author: null
      }));
    }
    if (
      this.state.sortChange ||
      this.state.authorChange ||
      this.state.topicChange
    ) {
      fetchArticles(
        this.state.topic,
        this.state.page,
        this.state.sort_by,
        this.state.author
      )
        .then(data => {
          this.setState(prevState => ({
            ...prevState,
            articles: data.articles,
            sortChange: false,
            authorChange: false,
            topicChange: false
          }));
        })
        .catch(error => {
          navigate("/error", {
            replace: true,
            state: {
              code: error.response.status,
              message: error.response.data.msg,
              from: "/articles"
            }
          });
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
