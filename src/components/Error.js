import React, { Component } from "react";

class Error extends Component {
  state = {
    something: false
  };

  render() {
    return (
      <div>
        <h1>Error</h1>
        <h1>Status code: {this.props.location.state.code}</h1>
        <h1>{this.props.location.state.message}</h1>
      </div>
    );
  }

  componentDidMount = () => {
    this.setState({ something: true });
  };
}

export default Error;
