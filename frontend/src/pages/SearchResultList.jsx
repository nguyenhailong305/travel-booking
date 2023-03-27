import React, { useState } from "react";
import Section from "../common/Section";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import TourCard from "../common/TourCard";
import Newsletter from '../common/Newsletter'

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  console.log(data);
  return (
    <>
      <Section title="Tour Search Result" />
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4>No tour found</h4>
            ) : (
              data?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
