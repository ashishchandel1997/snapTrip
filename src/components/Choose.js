import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import graph from "../images/graph.png";
import a2 from "../images/a2.jpg";
import a3 from "../images/a3.jpg";
import t1 from "../images/t1.jpg";
import t2 from "../images/t2.jpg";
import t3 from "../images/t3.jpg";
import t4 from "../images/t4.jpg";
import t5 from "../images/t5.jpg";
import t6 from "../images/t6.jpg";
import img1 from "../images/Crop image 1.png";
import img2 from "../images/Mask groups.png";
import ScrollTrigger from "react-scroll-trigger";
import HowSnaptripHelps from "./HowSnaptripHelps";
import camera from "../images/ivana-cajina-TUXUCVXmjQk-unsplash 1.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const sliderImageUrl = [
  {
    url: t1,
    data: "India",
    tour: "121 tours",
  },
  {
    url: t2,
    data: "America",
    tour: "125 tours",
  },
  {
    url: t3,
    data: "Norway",
    tour: "101 tours",
  },
  {
    url: t4,
    data: "England",
    tour: "93 tours",
  },
  {
    url: t5,
    data: "Denmark",
    tour: "131 tours",
  },
  {
    url: t6,
    data: "Dubai",
    tour: "163 tours",
  },
  {
    url: t1,
    data: "Russia",
    tour: "121 tours",
  },
];

const Choose = ({ whyChoose }) => {
  const detailMap = whyChoose?.details || [];

  const imgUrl = `https://argosmob.uk/snaptrip/admin/uploads/about/`;
  const handleScroll = (isVisible) => {
    if (isVisible) {
      const element = document.querySelector(".custom-ease-in-out");
      element.classList.add("animate__fadeIn");
    }
  };

  return (
    <>
      <section style={{ marginTop: "100px" }}>
        <div className="container text-center">
        <h4 className="headingText">Countries that people love the most!</h4>
        </div>
        <div className="parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={false}
            autoPlaySpeed={4000}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          >
            {sliderImageUrl.map((imageUrl, index) => {
              return (
                <div className="slider" key={index}>
                  <img src={imageUrl.url} alt="movie" />
                  <div className="sliderDiv">
                    <h6 className="prime_color">{imageUrl.data}</h6>
                    <p>{imageUrl.tour}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <HowSnaptripHelps />
        <div className="">
          <section className="testimonials" id="testimonials">
            <div className="col-12 text-center"></div>
            <div className="new_whyChoose ">
              <div className="new_imageDiv"></div>
              <div className="new_textDiv">
                <div className="new_textInner">
                  <div className="mt-5 Name">
                    <h2 className="headingText">Why Choose Us</h2>
                    <h2 className=" headingText mt-5 ">
                      Experience the Freedom
                    </h2>
                    <p className="mt-2 heading_Para">
                      SnapTrip is your passport to crafting, arranging,
                      <br /> and perfecting your dream vacations.
                    </p>
                    <p className="mt-4 heading_Para">
                      Our mission? <br />
                      To redefine holiday planning, making it personal,
                      stress-free, customizable, enjoyable, and, above
                      <br /> all, absolutely free, unlike traditional travel{" "}
                      <br /> agents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Choose;
