import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles/section.css";

const Section = ({title}) => {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col lg="12">
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section;
