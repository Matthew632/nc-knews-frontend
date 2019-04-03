import React, { Component } from 'react';
import { fetchData } from './api';
import { Link } from "@reach/router";
import { Container, Row, Col } from 'react-bootstrap';

class Articles extends Component {
    state = {
        articles: null
    }

    render() {
        let header = `${this.props.topic[0].toUpperCase()}${this.props.topic.slice(1)} Articles`
        return <div>
            <h2>{header}</h2>
            <Container>
                <Row><Col>Title</Col><Col>Comments</Col></Row>
                {this.state.articles && this.state.articles.map(art => <Row><Col><Link to={`/article/${art.article_id}`}>{art.title}</Link></Col><Col>{art.comment_count}</Col></Row>)}
            </Container>
        </div>
    }
    componentDidMount = () => {
        let path = '/articles';
        if (this.props.topic !== 'all') { path = `/articles?topic=${this.props.topic}` }
        fetchData(path).then(data => {
            this.setState({ articles: data.articles });
        });
    }
};

export default Articles;