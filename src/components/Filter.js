import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchData } from "../api";
import { navigate } from "@reach/router";

class Filter extends Component {
  state = {
    users: null
  };

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Author
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.users &&
            this.state.users.map(use => (
              <Dropdown.Item
                key={`key${use.username}`}
                id={`${use.username}`}
                name="author"
                onClick={this.handleClick}
              >
                {use.username}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  componentDidMount = () => {
    fetchData("/users")
      .then(data => {
        this.setState({ users: data.users });
      })
      .catch(error => {
        navigate("/error", {
          replace: true,
          state: {
            code: error.response ? error.response.status : "",
            message: error.response ? error.response.data.msg : "",
            from: "/articles"
          }
        });
      });
  };
  handleClick = event => {
    const user = event.target.id;
    navigate(`/articles/author/${user}`);
  };
}
export default Filter;
