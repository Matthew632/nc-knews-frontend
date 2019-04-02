import React, { Component } from 'react';
import { fetchData, patchVote } from './api';
import Comments from './Comments';
import Form from './Form';
import Button from 'react-bootstrap/Button';

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
                <p>{this.state.article.body}</p>
                <p><span>{this.state.article.votes}</span><Button variant="primary" id={`/articles/${this.props.id}`} onClick={this.handleClick}>Vote</Button></p>
            </div>
            }
            <Form types='Comment' articleId={this.props.id} />
            <Comments articleId={this.props.id} />
        </div>
    }

    componentDidMount = () => {
        fetchData(`/articles/${this.props.id}`).then(data => {
            this.setState({ article: data.article });
        });
    }

    handleClick = (event) => {
        patchVote(event.target.id).then(this.componentDidMount)
    }
    // the above .componentDidMount is a hack and should be refactored
    // maybe add to local storage to prevent repeated votes & disable button
};


export default Article;