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
      <Dropdown data-cy="topics">
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          {this.props.wording ? this.props.wording : "Topic"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.topics &&
            this.state.topics.map(top => (
              <Dropdown.Item
                key={`${top.slug}`}
                data-cy="topic-opt"
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
            code: error.response ? error.response.status : "",
            message: error.response ? error.response.data.msg : "",
            from: "/"
          }
        });
      });
  };

  handleTopic = event => {
    const slug = event.target.id;
    navigate(`/articles/topic/${slug}`);
  };
}

export default Topics;
