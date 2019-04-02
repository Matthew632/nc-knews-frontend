import React, { Component } from 'react';
import { postComment } from './api';

class Form extends Component {
    state = { userInput: '', }
    render() {
        const { types } = this.props;
        return <form onSubmit={this.handleSubmit}><label for={`add${types}`}>{`Add ${types}:`}</label>
            <textarea name={`add${types}`} id={`add${types}`} onChange={this.handleChange}></textarea>
            <input type="submit" value="Add"></input>
        </form>
    }
    handleChange(event) {
        //const { types } = this.props;
        const types = 'Comment'
        if (event.target.id === `add${types}`) { this.setState({ inputName: event.target.value }) }
        else { this.setState({ userInput: event.target.value }) };
    }
    //change the above so it does alternate

    handleSubmit(event) {
        const { types } = this.props;
        event.preventDefault();
        //const types = 'Comment'
        //alert('A name was submitted: ' + this.state.value);
        if (event.target.id === `add${types}`) { postComment(this.props.articleId, { username: 'guest', body: this.state.userInput }) };
    }
}

export default Form;