import React, { Component } from 'react';
import fetchArticle from './api';

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
            console.log('hi im here', data)
            this.setState({ article: data });
        });
    }
};


export default Article;