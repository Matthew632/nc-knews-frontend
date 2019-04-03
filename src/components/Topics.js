import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchData } from './api';


class Topics extends Component {
    state = {
        topics: null,
    }

    render() {
        return <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Topics
        </Dropdown.Toggle>
            <Dropdown.Menu>
                {this.state.topics && this.state.topics.map(top => <Dropdown.Item href={`/articles/${top.slug}`}>{`${top.slug[0].toUpperCase()}${top.slug.slice(1)}`}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    }

    componentDidMount = () => {
        fetchData('/topics').then(data => {
            this.setState({ topics: data.topics });
        });
    }

}

export default Topics;