import React, { Component } from 'react';
import { fetchData, patchVote } from './api';
import Container from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Comments extends Component {
    state = {
        comments: null,
    }
    render() {
        return <div>{this.state.comments && <div>
            <Container>
                <Row><Col>Comments</Col></Row>
                {this.state.comments.map(com => <div><Row><Col>User</Col><Col>{com.author}</Col></Row> <Row><Col>Comment</Col><Col>{com.body}</Col></Row><Row><Col>Votes</Col><Col><div><span>{com.votes}</span><Button variant="primary" id={`/comments/${com.comment_id}`} onClick={this.handleClick}>Approve</Button></div></Col></Row></div>)}
            </Container>
        </div>}</div>
    }

    // refactor the above convert date

    componentDidMount = () => {
        fetchData(`/articles/${this.props.articleId}/comments`).then(data => {
            this.setState({ comments: data.comments });
        });
    }

    handleClick = (event) => {
        patchVote(event.target.id).then(this.componentDidMount)
    }
    // the above .componentDidMount is a hack and should be refactored, should use status code
}

export default Comments;