import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SortBy = props => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Sort by
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          name="sort_by"
          id="created_at"
          onClick={props.handleClick}
          key="key1"
        >
          Date created
        </Dropdown.Item>
        <Dropdown.Item
          name="sort_by"
          id="comment_count"
          onClick={props.handleClick}
          key="key2"
        >
          Comment count
        </Dropdown.Item>
        <Dropdown.Item
          name="sort_by"
          id="votes"
          onClick={props.handleClick}
          key="key3"
        >
          Votes
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortBy;
