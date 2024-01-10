import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/1.png";


const WhyShould = ({ ourServices }) => {
  const data = ourServices?.details || [];
  return (
    <>
      <div className="why-choose-divs1">
        <div className="container">
          <div className="col-lg-7">
            <h5 className="comon-head-m"> {ourServices?.heading}</h5>
            <p>{ourServices?.description}</p>
            {data.map((ele) => {
              return (
                <div className="comon-choose my-4">
                  <figure>
                    <img src={img1} alt="pn" />
                  </figure>
                  <div className="coose-text">
                    <h5 className="mb-2">{ele?.heading}</h5>
                    <p>{ele?.text}</p>
                  </div>
                </div>
              );
            })}
            <Link className="btn let-bnt">Lets Plans Your Trip</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyShould;
