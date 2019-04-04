import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchData } from "./api";

class Filter extends Component {
  state = {
    users: null
  };

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          By author
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.users &&
            this.state.users.map(use => (
              <Dropdown.Item
                key={`key${use.username}`}
                id={`${use.username}`}
                name="author"
                onClick={this.props.handleClick}
              >
                {use.username}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  componentDidMount = () => {
    fetchData("/users").then(data => {
      this.setState({ users: data.users });
    });
  };
}
export default Filter;
