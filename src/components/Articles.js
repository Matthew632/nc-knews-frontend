import React, { Component } from 'react';
import { fetchData } from './api';
import { Link } from "@reach/router";
import Container from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Articles extends Component {
    state = {
        articles: null
    }
    render() {
        return <div>
            <h2>Articles</h2>
            <Container>
                <Row><Col>Title</Col><Col>Comments</Col></Row>
                {this.state.articles && this.state.articles.map(art => <Row><Col><Link to={`/article/${art.article_id}`}>{art.title}</Link></Col><Col>{art.comment_count}</Col></Row>)}
            </Container>
        </div>
    }
    componentDidMount = () => {
        fetchData('/articles').then(data => {
            console.log('in articles', data)
            this.setState({ articles: data.articles });
        });
    }
};

export default Articles;