import React, { Component } from "react";
import SortBy from "./SortBy";
import Filter from "./Filter.js";
import { fetchData, getArticles } from "./api";
import { Link } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";

class Articles extends Component {
  state = {
    articles: null,
    sort_by: null,
    author: null
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
        <Filter handleFilterClick={this.handleFilterClick} />
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
                  <Link to={`/article/${art.article_id}`}>{art.title}</Link>
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
    let path = "/articles?";
    if (this.props.topic !== "all") {
      path = `/articles?topic=${this.props.topic}`;
    }
    fetchData(path).then(data => {
      this.setState({ articles: data.articles });
    });
  };

  // componentDidUpdate(prevState) {
  //   console.log("in mount");
  //   if (
  //     prevState.sort_by !== this.state.sort_by ||
  //     prevState.author !== this.state.author
  //   ) {
  //     getArticles(this.state.sort_by, this.state.author).then(data => {
  //       this.setState({ articles: data.articles });
  //     });
  //   }
  // }

  handleFilterClick = event => {
    const pref = event.target.id;
    this.setState(prevState => ({ ...prevState, author: pref }));
  };

  handleClick = event => {
    const pref = event.target.id;
    this.setState(prevState => ({ ...prevState, sort_by: pref }));
  };
}

export default Articles;
