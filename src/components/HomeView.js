import React, { Component } from 'react';
import fetchArticles from './api';

class HomeView extends Component {
    state = {
        topArticles: null,
    }

    render() {
        return <div>
            <h1>NC Knews</h1>
            <h2>Top Articles</h2>
            <ol>
                {this.state.topArticles && this.state.topArticles.map(art => <li>{art.title}</li>)}
            </ol>
        </div>
    }
    componentDidMount = () => {
        fetchArticles('/articles?sort_by=comment_count&order=desc&limit=3').then(data => {
            console.log(data)
            this.setState({ topArticles: data });
        });
    }
};


export default HomeView;
