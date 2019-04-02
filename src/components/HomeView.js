import React, { Component } from 'react';
import { fetchData } from './api';
import { Link } from "@reach/router";
import Container from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class HomeView extends Component {
    state = {
        topArticles: null,
    }

    render() {
        return <div>
            <h1>NC Knews</h1>
            <h2>Top Articles</h2>
            <Container>
                <Row><Col>Title</Col><Col>Comments</Col></Row>
                {this.state.topArticles && this.state.topArticles.map(art => <Row><Col><Link to={`/article/${art.article_id}`} >{art.title}</Link></Col> <Col>{art.comment_count}</Col></Row>)}
            </Container>
        </div>
    }
    componentDidMount = () => {
        fetchData('/articles?sort_by=comment_count&order=desc&limit=3').then(data => {
            this.setState({ topArticles: data.articles });
        });
    }

    handleClick = (event) => {
        console.log(event.target.id);
    }
};


export default HomeView;
