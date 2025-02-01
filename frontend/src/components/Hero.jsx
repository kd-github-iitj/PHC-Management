import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Our public health center is dedicated to promoting well-being, preventive care, and a healthy lifestyle for the IIT Jodhpur community. From comprehensive health services to wellness programs, we are here to support you in achieving your best physical and mental health. Explore our resources, schedule appointments, and join us in building a healthier campus together!
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
