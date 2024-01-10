import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "../images/destination 1-01 1.png";
import img2 from "../images/Icon-02 1.png";
import img3 from "../images/Icon-03 1.png";
import img4 from "../images/Icon-04 1.png";
import img5 from "../images/Icon-05 1.png";

const HowSnaptripHelps = () => {
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const handleDropdown = () => {
    navigate("/smarttrip");
  };

  const handleSelect = (e) => {
    const [selectedid, selectedname] = e.target.value.split("-");
    sessionStorage.setItem("countryID", selectedid);
    sessionStorage.setItem("countryName", selectedname);
    setSelectedId(selectedid);
  };

  const getCountry = () => {
    axios
      .get("https://www.argosmob.uk/snaptrip/snaptrip_api_for_countries.php")
      .then((res) => {
        setOptions(res.data?.User_status);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getCountry();
  }, []);
  return (
    <div className="mt-2 mb-4">
      <section className="testimonials pt-5 pb-3 pb-4" id="testimonials">
        <div className="">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="headingText">How SnapTrip Helps You?</h2>
            </div>
          </div>
          <p className="heading_Para mt-3 text-center">
            SnapTrip, your AI-powered travel partner, offers step-by-step
            guidance.
            <br />
            We create instant, detailed itineraries, tailored to your budget and
            travel dates, saving you time and stress.
          </p>
          <div style={{ position: "relative" }}>
            <div className="border2"></div>
            <div className="d-flex w-100 mobile_width">
              <div className="equalWidth">
                <div className="image_div">
                  <img src={img1} alt="img" />
                </div>
                <div className="borderDotted">
                  <div id="borderLeft"></div>
                  <p className="small_para mt-3 text-center">
                    Pick your <br />
                    destination
                  </p>
                </div>
              </div>
              <div className="equalWidth">
                <div className="image_div">
                  <img src={img2} alt="img" />
                </div>
                <div className="borderDotted">
                  <div id="borderLeft"></div>
                  <p className="small_para mt-3 text-center">
                    Choose your
                    <br /> trip style
                  </p>
                </div>
              </div>
              <div className="equalWidth">
                <div className="image_div">
                  <img src={img3} alt="img" />
                </div>
                <div className="borderDotted">
                  <div id="borderLeft"></div>
                  <p className="small_para mt-3 text-center">
                    Set your trip
                    <br /> duration
                  </p>
                </div>
              </div>
              <div className="equalWidth">
                <div className="image_div">
                  <img src={img4} alt="img" />
                </div>
                <div className="borderDotted">
                  <div id="borderLeft"></div>
                  <p className="small_para mt-3 text-center">
                    Select your preferred
                    <br /> attractions
                  </p>
                </div>
              </div>
              <div className="equalWidth">
                <div className="image_div">
                  <img src={img5} alt="img" />
                </div>
                <div className="borderDotted">
                  <div id="borderLeft"></div>
                  <p className="small_para mt-3 text-center">
                    Itinerary
                    <br /> complete!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center">
        <button
          className="readBtn "
          onClick={handleDropdown}
          style={{ padding: "5px 25px" }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default HowSnaptripHelps;
