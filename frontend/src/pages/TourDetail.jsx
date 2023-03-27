import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-detail.css";
import { useParams } from "react-router-dom";
import { Col, Container, ListGroup, Row, Form } from "reactstrap";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../common/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { authContext } from "../context/authContext";

const TourDetail = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(authContext);
  const { data: tour } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    address,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  console.log(reviews, "ahahahah");

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      console.log(result, "Aaaaaaaaaaaa");
      if (!res.ok) alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not Rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-fill"></i>
                      {address}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i>
                      {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i>${price}{" "}
                      /per person
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i>
                      {distance} k/m
                    </span>

                    <span>
                      <i className="ri-group-line"></i>
                      {maxGroupSize}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <span
                          key={rating}
                          onClick={() => setTourRating(rating)}
                        >
                          {rating} <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="share your thoughts"
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews?.map((reviews , index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{reviews.username}</h5>
                              <p>
                                {new Date(reviews.createAt).toLocaleDateString(
                                  "vn-VN",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center ">
                              {reviews.rating}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <h6>{reviews.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetail;
