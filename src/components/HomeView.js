import React, { Component } from "react";
import { fetchData } from "../api";
import Topics from "./Topics";
import AddArticle from "./AddArticle";
import { Link, navigate } from "@reach/router";
import { Container, Row, Col } from "react-bootstrap";
import "../style.css";

class HomeView extends Component {
  state = {
    topArticles: null,
    previewText: null,
    previewArr: null,
    change: false,
    previewChange: false
  };

  render() {
    return (
      <div>
        <h1>NC News</h1>
        <Topics wording="Search by Topic" />
        <Container className="topArticles">
          <Row className="addArticleHeader">
            <Col>Top Articles</Col>
            <Col>Comments</Col>
          </Row>
          {this.state.topArticles &&
            this.state.topArticles.map(art => (
              <Row key={art.article_id}>
                <Col>
                  <Link
                    key={art.article_id}
                    data-cy="topthree"
                    to={`/article/${art.article_id}`}
                  >
                    {art.title}
                  </Link>
                  {this.state.previewText && <p className = "preview">{this.state.previewText[`id${art.article_id}`]}</p>}
                  </Col>{" "}
                <Col>{art.comment_count}</Col>
              </Row>
            ))}
        </Container>
        {this.props.user && <AddArticle user={this.props.user} />}
      </div>
    );
  }


    shorten = obj => {
        const body = obj.article.body;
        const shortened = body.length < 50 ? body : `${body.substring(0,body.substring(0,49).lastIndexOf(' '))}...`;
        return shortened
  }

  getPreviews = arr => {
    Promise.all([fetchData(`/articles/${this.state.topArticles[0].article_id}`),fetchData(`/articles/${this.state.topArticles[1].article_id}`),fetchData(`/articles/${this.state.topArticles[2].article_id}`)]).then(([zero,one,two]) => {this.setState(prevState => ({ ...prevState, previewArr: [zero,one,two], previewChange: true}))
  })
}

  componentDidMount = () => {
    fetchData("/articles?sort_by=comment_count&order=desc&limit=3")
      .then(data => {
        this.setState({ topArticles: data.articles, change: true })})
      .catch(error => {
        navigate("/error", {
          replace: true,
          state: {
            code: error.response ? error.response.status : "",
            message: error.response ? error.response.data.msg : "",
            from: "/"
          }
        });
      });
  };

  componentDidUpdate(prevState) {
    if (this.state.change) {
      this.getPreviews(this.state.topArticles)
      this.setState(prevState => ({
        ...prevState,
        change: false
      }))
    }
    if (this.state.previewChange) {
      const snippets = {};
      this.state.previewArr.forEach(obj => snippets[`id${obj.article.article_id}`] = this.shorten(obj));
      this.setState(prevState => ({
        ...prevState,
        previewText: snippets,
        previewChange: false
      }))
    }
  }

  handleTopic = event => {
    const slug = event.target.id;
    navigate(`/articles/topic/${slug}`);
  };
}

export default HomeView;
