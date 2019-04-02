import React, { Component } from 'react';
import { fetchData, postVote } from './api';
import Form from './Form';
import Container from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Article extends Component {
    state = {
        article: null,
        comments: null,
    }

    render() {
        return <div>
            {this.state.article && <div>
                <h2>{this.state.article.title}</h2>
                <p>{`By ${this.state.article.author}`}</p>
                <p>{`${this.state.article.created_at.slice(8, 10)}-${this.state.article.created_at.slice(5, 8)}${this.state.article.created_at.slice(0, 4)}`}</p>
                <p>Some words...</p>
                <p><span>{this.state.article.votes}</span><Button variant="primary" id={`/articles/${this.props.id}`} onClick={this.handleClick}>Vote</Button></p>
            </div>
            }
            <Form types='Comment' />
            <div>{this.state.comments && <div>
                <Container>
                    <Row><Col>Comments</Col></Row>
                    {this.state.comments.map(com => <div><Row><Col>User</Col><Col>{com.author}</Col></Row> <Row><Col>Comment</Col><Col>{com.body}</Col></Row><Row><Col>Votes</Col><Col><div><span>{com.votes}</span><Button variant="primary" id={`/comments/${com.comment_id}`} onClick={this.handleClick}>Approve</Button></div></Col></Row></div>)}
                </Container>
            </div>}</div>
        </div>
    }

    // refactor the above convert date
    componentDidMount = () => {
        fetchData(`/articles/${this.props.id}`).then(data => {
            this.setState({ article: data.article });
        });
        fetchData(`/articles/${this.props.id}/comments`).then(data => {
            this.setState(prevState => ({ ...prevState, comments: data.comments }));
        });
    }

    handleClick = (event) => {
        postVote(event.target.id).then(this.componentDidMount)
    }
    // maybe add to local storage to prevent repeated votes & disable button
};


export default Article;