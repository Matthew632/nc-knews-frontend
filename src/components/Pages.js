import React from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";

const Pages = props => {
  const active = props.page;
  const count = Math.ceil(props.count / 10);
  let items = [];
  for (let number = 1; number <= count; number++) {
    items.push(
      <Pagination.Item
        name={number}
        key={number}
        active={number === active}
        onClick={props.handlePage}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      {count > 1 && (
        <Container>
          <Row>
            <Col />
            <Col>
              <Pagination>{items}</Pagination>
            </Col>
            <Col />
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Pages;
