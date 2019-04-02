import React, { Component } from 'react';
import { fetchData } from './api';
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
            </div>
            }<div>{this.state.comments && <div>
                <Container>
                    <Row><Col>Comments</Col></Row>
                    {this.state.comments.map(com => <div><Row><Col>User</Col><Col>{com.author}</Col></Row> <Row><Col>Comment</Col><Col>{com.body}</Col></Row><Row><Col>Votes</Col><Col><div><span>{com.votes}</span><Button variant="primary" id={com.comment_id} onClick={this.handleClick}>Approve</Button></div></Col></Row></div>)}
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
            console.log('in article component', data.comments)
            this.setState(prevState => ({ ...prevState, comments: data.comments }));
        });
    }

    handleClick = (event) => {
        console.log(event.target.id)
    }
};


export default Article;