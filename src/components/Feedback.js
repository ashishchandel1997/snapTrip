import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const rating = [
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
];

const Feedback = () => {
  const [data, setData] = useState([]);

  const baseUrl = "https://argosmob.uk/snaptrip/admin/uploads/testimonial/";

  useEffect(() => {
    axios
      .get("https://www.argosmob.uk/snaptrip/snaptrip_get_testimonials.php")
      .then((res) => {
        if (res?.data?.success) {
          setData(res?.data?.User_status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-2">
      <section className="testimonials py-5" id="testimonials">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h4 className="headingText">
                What travellers say About SnapTrip
              </h4>
            </div>
          </div>
        </div>
      </section>
      <div className="parent">
        {data.length > 0 && (
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
            {data.map((imageUrl, index) => {
              return (
                <div className="slider2" key={index}>
                  <div className=" position-relative cardBox">
                    <div className="p-4 mt-5 mt-lg-0 ">
                      <div className="d-flex flex-column justify-content-center text-center mt-4">
                        <div className="pic-wrap">
                          <figure className="mb-0 avatar">
                            <img
                              src={`${baseUrl}${imageUrl.profile}`}
                              className="img-fluid"
                              alt="client review"
                            />
                          </figure>
                        </div>
                        <span className="text-yellow my-2">
                          {rating.map((element, index) => {
                            if (index < parseInt(imageUrl?.rating)) {
                              return element;
                            }
                          })}
                        </span>
                        <span className="mt-0">
                          <strong>{imageUrl.name}</strong>
                        </span>
                        <span className="theme-text-accent-one font-small mb-3 fw-bold">
                          Tech Travel
                        </span>
                      </div>
                      <p className="theme-text-accent-one lh-lg font-small mb-0 pt-3 border-top">
                        {imageUrl.tell}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Feedback;
