import React from "react";
import "../styles/newsletter.css";
import maleTourist from "../assets/images/male-tourist.png";
import { Col, Container, Row } from "reactstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information</h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                alias magnam aperiam nam quia saepe ab eos dolore natus autem
                enim iure, modi itaque molestiae consequuntur rerum sunt odio
                distinctio.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
