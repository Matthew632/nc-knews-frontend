import React, { Component } from 'react';
import fetchArticle from './api';
import Container from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Article extends Component {
    state = {
        article: null,
    }

    render() {
        return <div>
            <h2>Article</h2>
        </div>
    }
    componentDidMount = () => {
        fetchArticle().then(data => {
            console.log('in article component', data)
            this.setState({ article: data });
        });
    }
};


export default Article;