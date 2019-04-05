import React, { Component } from "react";
import { fetchData } from "./api";
import Topics from "./Topics";
import AddArticle from "./AddArticle";
import { Link, navigate } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";

class HomeView extends Component {
  state = {
    topArticles: null
  };

  render() {
    return (
      <div>
        <h1>NC News</h1>
        <Topics handleTopic={this.handleTopic} />
        <h2>Top Articles</h2>
        <Container>
          <Row>
            <Col>Title</Col>
            <Col>Comments</Col>
          </Row>
          {this.state.topArticles &&
            this.state.topArticles.map(art => (
              <Row>
                <Col>
                  <Link to={`/article/${art.article_id}`}>{art.title}</Link>
                </Col>{" "}
                <Col>{art.comment_count}</Col>
              </Row>
            ))}
        </Container>
        {this.props.user && <AddArticle user={this.props.user} />}
      </div>
    );
  }
  componentDidMount = () => {
    fetchData("/articles?sort_by=comment_count&order=desc&limit=3")
      .then(data => {
        this.setState({ topArticles: data.articles });
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

  componentDidUpdate(prevState) {
    console.log("in update");
    if (this.state.change) {
      this.setState(prevState => ({
        ...prevState,
        change: false
      }));
    }
  }

  handleTopic = event => {
    const slug = event.target.id;
    console.log(slug);
    navigate(`/articles/${slug}`);
  };

  handleClick = event => {
    console.log(event.target.id);
  };
}

export default HomeView;
