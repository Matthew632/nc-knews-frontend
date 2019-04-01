import React, { Component } from 'react';
import fetchArticles from './api';

class HomeView extends Component {
    state = {
        articles: null,
    }

    render() {
        return <h1>NC Knews</h1>
    }
    componentDidMount = () => {
        fetchArticles('/articles').then(data => {
            console.log(data)
            this.setState({ articles: data });
        });
    }


};


export default HomeView;
