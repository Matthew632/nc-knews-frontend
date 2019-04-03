import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SortBy = props => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Sort by
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item id="created_at" onClick={props.handleClick}>
          Date created
        </Dropdown.Item>
        <Dropdown.Item id="comment_count" onClick={props.handleClick}>
          Comment count
        </Dropdown.Item>
        <Dropdown.Item id="votes" onClick={props.handleClick}>
          Votes
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortBy;
