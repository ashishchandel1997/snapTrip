import React from "react";
import img1 from "../images/Vector-01 1.png";
import img2 from "../images/Vector-02 1.png";
import img3 from "../images/Vector-03 1.png";
import img4 from "../images/Vector-04 1.png";

const WhatSetsUs = () => {
  return (
    <div>
      <div className="mt-5">
        <section className="testimonials py-5" id="testimonials">
          <div className="">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="headingText mb-3">What Sets Us Apart</h2>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center w-100 mobile_flex container">
              <div className="WhatDiv">
                <div className="whatImg">
                  <img src={img1} alt="img" />
                </div>
                <div className="whatText text-center">
                  <p className="para_heading">Effortless Planning </p>
                  <p className="para_text">
                    Our AI algorithms create personalised itineraries within
                    seconds.
                  </p>
                </div>
              </div>
              <div className="WhatDiv">
                <div className="whatImg">
                  <img src={img1} alt="img" />
                </div>
                <div className="whatText text-center">
                  <p className="para_heading">No More Middlemen </p>
                  <p className="para_text">
                    Don't waste your time doing endless research on the internet
                    or worse, wasting your hard earned money on travel agents.
                  </p>
                </div>
              </div>
              <div className="WhatDiv">
                <div className="whatImg">
                  <img src={img1} alt="img" />
                </div>
                <div className="whatText text-center">
                  <p className="para_heading">Cultural Immersion</p>
                  <p className="para_text">
                    We take you on a Cultural Immersion trip, not just a
                    superficial vacation. You won't miss any Insta-worthy place
                    using our itinerary planner!
                  </p>
                </div>
              </div>

              <div className="WhatDiv">
                <div className="whatImg">
                  <img src={img2} alt="img" />
                </div>
                <div className="whatText text-center">
                  <p className="para_heading">Curated Experience </p>
                  <p className="para_text">
                    Curate your itinerary with
                    <br /> our customisation
                    <br /> tool seamlessly
                  </p>
                </div>
              </div>
              <div className="WhatDiv">
                <div className="whatImg">
                  <img src={img3} alt="img" />
                </div>
                <div className="whatText text-center">
                  <p className="para_heading">Offline access</p>
                  <p className="para_text">
                    No wifi, no problem.Country
                    <br /> guide can be locally
                    <br /> downloaded for access
                    <br /> anywhere.
                  </p>
                </div>
              </div>
              <div className="WhatDiv">
                <div className="whatImg">
                  <img src={img4} alt="img" />
                </div>
                <div className="whatText text-center">
                  <p className="para_heading">
                    Flaunt your global
                    <br /> footprint
                  </p>
                  <p className="para_text">
                    Share your global travel
                    <br />
                    footprint with friends
                    <br />
                    on social media!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-5">
        <section className="testimonials pb-5" id="testimonials">
          <div className="d-flex justify-content-center align-items-center w-100 whoContainer">
            {/* <div className="whoText">
              <h3 className="para_heading2">Our itineraries are for you if -</h3>

              <p className= " para_text2 mt-4 d-flex ">
                <li style={{ listStyleType: "disc" }}>
                </li>
                <p className="para_text2">   You are not willing to spend a time on <br />
                  researching for your trip rather get a <br />
                  tailored itinerary immediately.</p>
              </p>
     

              <p className=" para_text2 mt-4 d-flex">
              <li style={{ listStyleType: "disc" }}>
                </li>
                <p className="para_text2">      
                        You prefer technology and don't want to
                <br /> spend more money on itinerary by having
                <br /> a travel agent.</p>
              </p>
            </div> */}
            <div className="rectangle">
              <h4 className="headingText text-center my-4">Who is it for?</h4>
              <h3 className="para_heading2 ps-5">
                Our itineraries are for you if -
              </h3>
              <p className=" para_text2 mt-4 d-flex ps-5">
                <li style={{ listStyleType: "disc" }}></li>
                <p className="para_text2">
                  {" "}
                  You are not willing to spend a time on researching for your
                  trip rather
                  <br /> get a tailored itinerary immediately.
                </p>
              </p>

              <p className=" para_text2 mt-4 d-flex ps-5">
                <li style={{ listStyleType: "disc" }}></li>
                <p className="para_text2">
                  You prefer technology and don't want to spend more money on
                  <br /> itinerary by having a travel agent.
                </p>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhatSetsUs;
