import React from "react";
import { Col } from "reactstrap";
import TourCard from "../../common/TourCard";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedTourList = () => {
  const { data: featuredTours  } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );
  return (
    <>

      { featuredTours?.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
