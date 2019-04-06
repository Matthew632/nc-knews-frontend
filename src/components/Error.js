import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div>
        <h1>Error</h1>
        {this.props.location.state && (
          <h1>Status code: {this.props.location.state.code}</h1>
        )}
        {this.props.location.state ? (
          <h1>{this.props.location.state.message}</h1>
        ) : (
          <h1>Page not found</h1>
        )}
      </div>
    );
  }
}

export default Error;
