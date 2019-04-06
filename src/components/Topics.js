import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchData } from "../api";
import { navigate } from "@reach/router";

class Topics extends Component {
  state = {
    topics: null
  };

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Topic
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.topics &&
            this.state.topics.map(top => (
              <Dropdown.Item
                id={`${top.slug}`}
                onClick={this.handleTopic}
              >{`${top.slug[0].toUpperCase()}${top.slug.slice(
                1
              )}`}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  componentDidMount = () => {
    fetchData("/topics")
      .then(data => {
        this.setState({ topics: data.topics });
      })
      .catch(error => {
        navigate("/error", {
          replace: true,
          state: {
            code: error.response.status,
            message: error.response.data.msg,
            from: "/"
          }
        });
      });
  };

  handleTopic = event => {
    const slug = event.target.id;
    console.log(slug);
    navigate(`/articles/topic/${slug}`);
  };
}

export default Topics;
