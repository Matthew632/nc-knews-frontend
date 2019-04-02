import React, { Component } from 'react';
import fetchData from './api';
import Container from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Article extends Component {
    state = {
        article: null,
    }

    render() {
        return <div>
            {this.state.article && <div>
                <h2>{this.state.article.title}</h2>
                <p>{`By ${this.state.article.author}`}</p>
                <p>{`${this.state.article.created_at.slice(8, 10)}-${this.state.article.created_at.slice(5, 8)}${this.state.article.created_at.slice(0, 4)}`}</p>
                <p>Some words...</p>
            </div>
            }
        </div>
    }
    // refactor the above convert date
    componentDidMount = () => {
        fetchData(`/articles/${this.props.id}`).then(data => {
            console.log('in article component', data.article)
            this.setState({ article: data.article });
        });
    }
};


export default Article;