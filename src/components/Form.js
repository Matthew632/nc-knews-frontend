import React, { Component } from 'react';
import { postComment } from './api';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { userInput: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { types } = this.props;
        return <form onSubmit={this.handleSubmit}><label for={`add${types}`}>{`Add ${types}:`}</label>
            <textarea value={this.state.userInput} name={`add${types}`} id={`add${types}`} onChange={this.handleChange}></textarea>
            <input type="submit" value="Add"></input>
        </form>
    }

    handleChange(event) {
        this.setState({ userInput: event.target.value });
    }
    //change the above so it does alternate

    handleSubmit(event) {
        event.preventDefault();
        postComment(this.props.articleId, { "username": "cooljmessy", "body": this.state.userInput }).then(this.setState({ userInput: '' }));
    }
}

export default Form;