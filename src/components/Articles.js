import React, { Component } from "react";
import SortBy from "./SortBy";
import Filter from "./Filter.js";
import Topics from "./Topics";
import Pages from "./Pages";
import { fetchArticles } from "../api";
import { Link, navigate } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import { dateConvert } from "../utils";
import "../style.css";

class Articles extends Component {
  state = {
    articles: null,
    sort_by: "created_at",
    author: null,
    sortChange: false,
    authorChange: false,
    topicChange: false,
    pageChange: false,
    topic: null,
    page: 1,
    count: null
  };

  render() {
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
            <Col className="topicFilter">
              <Topics />
            </Col>
          </Row>
        </Container>
        <Container className="articles">
          <Row>
            <Col>Title</Col>
            <Col className="alt">
              {this.state.sort_by === "created_at"
                ? "Created"
                : this.state.sort_by === "votes"
                ? "Votes"
                : "Comments"}
            </Col>
            <Col className="columns">Comments</Col>
            <Col className="columns">Votes</Col>
            <Col className="columns">Created</Col>
          </Row>
          {this.state.articles &&
            this.state.articles.map(art => (
              <Row key={`key${art.article_id}`}>
                <Col>
                  <Link
                    cy-data="articleList"
                    to={`/article/${art.article_id}`}
                    key={`key${art.article_id}`}
                  >
                    {art.title}
                  </Link>
                </Col>
                <Col className="alt">
                  {this.state.sort_by === "created_at"
                    ? dateConvert(art[this.state.sort_by])
                    : art[this.state.sort_by]}
                </Col>
                <Col className="columns">{art.comment_count}</Col>
                <Col className="columns">{art.votes}</Col>
                <Col className="columns">{dateConvert(art.created_at)}</Col>
              </Row>
            ))}
        </Container>
        <Pages
          page={this.state.page}
          count={this.state.count}
          handlePage={this.handlePage}
        />
      </div>
    );
  }
  componentDidMount = () => {
    let topicVal = this.props.topic ? this.props.topic : null;
    fetchArticles(topicVal)
      .then(data => {
        this.setState({
          articles: data.articles,
          count: data.total_count,
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
            count: data.total_count,
            sortChange: false,
            authorChange: false,
            topicChange: false,
            page: 1
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
    if (this.state.pageChange) {
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
            count: data.total_count,
            pageChange: false
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

  handlePage = event => {
    const newPage = event.target.name;
    this.setState(prevState => ({
      ...prevState,
      page: newPage,
      pageChange: true
    }));
  };
}

export default Articles;
