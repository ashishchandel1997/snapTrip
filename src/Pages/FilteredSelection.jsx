import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Snackbar from "../components/AuthComponent/Snackbar";
import logo_1 from "../images/Icon_1.png";
import logo_2 from "../images/Icon_2.png";
import logo_3 from "../images/Icon_3.png";
import logo_4 from "../images/Icon_4.png";
import logo_5 from "../images/Icon_5.png";
import logo_6 from "../images/Icon_6.png";
import logo_7 from "../images/Icon_7.png";
import logo_8 from "../images/Icon_8.png";
import logo_9 from "../images/Icon_9.png";

const FilteredSelection = ({ user, setUser }) => {
  const [step, setStep] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [select3, setSelect3] = useState();
  const [select4, setSelect4] = useState();
  const [select5, setSelect5] = useState();

  const countryName = sessionStorage.getItem("countryName");

  const navigate = useNavigate();

  const handleRadio1 = (e) => {
    setSelect1(e.target.value);
  };

  const handleRadio2 = (e) => {
    setSelect2(e.target.value);
    if (e.target.value == "Weekend_getaway") {
      setSelect2("2-4 days");
    }
    if (e.target.value == "Mini-vacation") {
      setSelect2("4-9 days");
    }
    if (e.target.value == "Full-blown vacation") {
      setSelect2("9-14 days");
    }
  };

  const handleRadio4 = (e) => {
    setSelect4(e.target.value);
  };
  const handleRadio5 = (e) => {
    setSelect5(e.target.value);
  };

  const handleGenerateTrip = () => {
    if (step === 4 && (!select5 || select5.trim() === "")) {
      setToggle(true);
      return;
    }

    navigate("/trip", {
      state: [
        {
          trip_style: select1,
          trip_length: select2,
          trip_nature: select4,
          trip_culture: select5,
        },
      ],
    });
  };

  const handleNext = () => {
    // Check validation for each step
    if (step === 1 && (!select1 || select1.trim() === "")) {
      setToggle(true);
      return;
    } else if (
      step === 2 &&
      (!select2 || select2.trim() === "") &&
      (!select3 || select3.trim() === "")
    ) {
      setToggle(true);
      return;
    } else if (step === 3 && (!select4 || select4.trim() === "")) {
      setToggle(true);
      return;
    } else if (step === 4 && (!select5 || select5.trim() === "")) {
      setToggle(true);
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 2) {
      setSelect2(null);
    } else if (step === 3) {
      setSelect3(null);
    } else if (step === 4) {
      setSelect4(null);
    }

    // Go back to the previous step
    setStep(step - 1);
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <div className="filteredComp p-5 text-center">
        <div className="row justify-content-center pt-0 p-4" id="wizardRow">
          <h2 style={{ color: "#006b7e" }}>Welcome to {countryName}</h2>
          <h6
            className="
        mb-5"
            style={{ color: "#161616" }}
          >
            Recommended season : December through April
          </h6>
          <div className="col-md-10 text-center">
            <div className="wizard-form py-4 my-2">
              <ul id="progressBar" className="progressbar px-lg-5 px-0">
                <li
                  id="progressList-1"
                  className={`d-inline-block  w-25 position-relative text-center float-start progressbar-list1 ${
                    step >= 1 ? "active2" : ""
                  }`}
                >
                  Step 1
                </li>
                <li
                  id="progressList-2"
                  className={`d-inline-block  w-25 position-relative text-center float-start progressbar-list ${
                    step >= 2 ? "active" : ""
                  }`}
                >
                  Step 2
                </li>
                <li
                  id="progressList-3"
                  className={`d-inline-block  w-25 position-relative text-center float-start progressbar-list ${
                    step >= 3 ? "active" : ""
                  }`}
                >
                  Step 3
                </li>
                <li
                  id="progressList-4"
                  className={`d-inline-block  w-25 position-relative text-center float-start progressbar-list ${
                    step >= 4 ? "active" : ""
                  }`}
                >
                  Generate Trip
                </li>
              </ul>
            </div>
          </div>
        </div>

        {step === 1 && (
          <section className="py-3 p-5">
            <div className="p-3">
              <h2 className="tile_heading">Choose your trip style</h2>
            </div>
            <div className="cardsComponent">
              <div class="tile">
                <input
                  type="radio"
                  name="sports"
                  id="sport1"
                  value="Intense"
                  onChange={handleRadio1}
                />
                <label for="sport1">
                  <img src={logo_1} className="tile_image" />
                  <div>
                    <h4>Intense</h4>
                    <h6 className={select1 == "Intense" ? "coloor" : null}>
                      move more, see more
                    </h6>
                  </div>
                </label>
              </div>
              <div class="tile">
                <input
                  type="radio"
                  name="sports"
                  id="sport2"
                  value="Relaxed"
                  onChange={handleRadio1}
                />
                <label for="sport2">
                  <img src={logo_2} className="tile_image" />
                  <div>
                    <h4>Relaxed</h4>
                    <h6 className={select1 == "Relaxed" ? "coloor" : null}>
                      laid back, soak in the vibe
                    </h6>
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center pt-4">
              <button type="button" className="readBtn" onClick={handleNext}>
                Next
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="py-3 p-5 cardsinner">
            <div className="p-3">
              <h2 className="tile_heading">Choose your trip duration</h2>
            </div>
            <div className="cardsComponent">
              <div class="tile">
                <input
                  type="radio"
                  name="length"
                  id="sport11"
                  value="Weekend_getaway"
                  onChange={handleRadio2}
                />
                <label for="sport11">
                  <img src={logo_3} className="tile_image" />
                  <div>
                    <h5>Weekend getaway</h5>
                    <h6 className={select2 == "2-4 days" ? "coloor" : null}>
                      2-4 days
                    </h6>
                  </div>
                </label>
              </div>
              <div class="tile">
                <input
                  type="radio"
                  name="length"
                  id="sport12"
                  value="Mini-vacation"
                  onChange={handleRadio2}
                />
                <label for="sport12">
                  <img src={logo_4} className="tile_image" />
                  <div>
                    <h5>Mini-Vacation</h5>
                    <h6 className={select2 == "4-9 days" ? "coloor" : null}>
                      4-9 days
                    </h6>
                  </div>
                </label>
              </div>
              <div class="tile">
                <input
                  type="radio"
                  name="length"
                  id="sport13"
                  value="Full-blown vacation"
                  onChange={handleRadio2}
                />
                <label for="sport13">
                  <img src={logo_5} className="tile_image" />
                  <div>
                    <h5>Full-Blown Vacation</h5>
                    <h6 className={select2 == "9-14 days" ? "coloor" : null}>
                      9-14 days
                    </h6>
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center pt-4">
              <button type="button" className="backBtn" onClick={handleBack}>
                Back
              </button>
              <button type="button" className="readBtn" onClick={handleNext}>
                Next
              </button>
            </div>
          </section>
        )}
        {step === 3 && (
          <section className="py-3 p-5">
            <div className="p-3">
              <h2 className="tile_heading">Nature Immersion</h2>
            </div>
            <div className="cardsComponent">
              <div class="tile">
                <input
                  type="radio"
                  name="nature"
                  id="sport14"
                  value="Unmissable"
                  onChange={handleRadio4}
                />
                <label for="sport14">
                  <img src={logo_6} className="tile_image" />
                  <div>
                    <h4>Unmissable </h4>
                    <h6 className={select4 == "Unmissable" ? "coloor" : null}>
                      The landmarks that shouldn’t be missed
                    </h6>
                  </div>
                </label>
              </div>
              <div class="tile">
                <input
                  type="radio"
                  name="nature"
                  id="sport15"
                  value="A lot more"
                  onChange={handleRadio4}
                />
                <label for="sport15">
                  <img src={logo_7} className="tile_image" />
                  <div>
                    <h4>A lot more</h4>
                    <h6 className={select4 == "A lot more" ? "coloor" : null}>
                      More landmarks to explore for nature lovers
                    </h6>
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center pt-4">
              <button type="button" className="backBtn" onClick={handleBack}>
                Back
              </button>
              <button type="button" className="readBtn" onClick={handleNext}>
                Next
              </button>
            </div>
          </section>
        )}
        {step === 4 && (
          <section className="pt-3 p-5">
            <div className="p-3">
              <h2 className="tile_heading">Cultural Immersion</h2>
            </div>
            <div className="cardsComponent">
              <div class="tile">
                <input
                  type="radio"
                  name="culture"
                  id="sport16"
                  value="Unmissable"
                  onChange={handleRadio5}
                />
                <label for="sport16">
                  <img src={logo_8} className="tile_image" />
                  <div>
                    <h4>Unmissable </h4>
                    <h6 className={select5 == "Unmissable" ? "coloor" : null}>
                      The must see cultural sites and monuments
                    </h6>
                  </div>
                </label>
              </div>
              <div class="tile">
                <input
                  type="radio"
                  name="culture"
                  id="sport17"
                  value="A lot more"
                  onChange={handleRadio5}
                />
                <label for="sport17">
                  <img src={logo_9} className="tile_image" />
                  <div>
                    <h4>A lot more</h4>
                    <h6 className={select5 == "A lot more" ? "coloor" : null}>
                      Sights for people fond of culture
                    </h6>
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center">
              <button type="button" className="backBtn" onClick={handleBack}>
                Back
              </button>
              <button className="readBtn mt-4" onClick={handleGenerateTrip}>
                Generate Trip
              </button>
            </div>
          </section>
        )}
      </div>
      {toggle && (
        <Snackbar
          setToggle={setToggle}
          displayText={"Please select an input type  before proceeding."}
        />
      )}
    </div>
  );
};

export default FilteredSelection;
