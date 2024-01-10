import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import { TiTick } from "react-icons/ti";
import Accordion from "react-bootstrap/Accordion";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const CitySelect = ({ setToggle, region, user, getChartApi, getCities }) => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState();
  const [range1, setRange1] = useState(0);
  const [range2, setRange2] = useState(0);
  const [range3, setRange3] = useState(0);
  const [range4, setRange4] = useState(0);
  const [range5, setRange5] = useState(0);
  const [comment, setComment] = useState("");
  const [cityData, setCityData] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [count, setCount] = useState([]);
  const [ratings, setRatings] = useState(0);
  const rndmArray = [1, 2, 3, 4, 5, 6];

  const handleClose = () => {
    setShow(false);
    setToggle(false);
  };

  const handleReview = (e) => {
    setComment(e.target.value);
  };
  const rating = () => {
    if (
      parseInt(range1) +
        parseInt(range2) +
        parseInt(range3) +
        parseInt(range4) +
        parseInt(range5) >
      0
    ) {
      const data =
        (parseInt(range1) +
          parseInt(range2) +
          parseInt(range3) +
          parseInt(range4) +
          parseInt(range5)) /
        5;
      setRatings(data);
    }
  };

  const handleSave = () => {
    const formData = {
      userid: user,
      countryid: data?.country?.id,
      cities: JSON.stringify(count),
      sightseeng: range1,
      people: range2,
      quality: range3,
      safety: range4,
      price: range5,
      review: comment,
    };

    axios
      .post(
        "https://www.argosmob.uk/snaptrip/snaptrip_add_visited_country.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          getChartApi();
          getCities();
          alert("Succesfully Added");
          rating();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    handleClose();
  };

  const handleDivClick = (id) => {
    setCityData((prevCities) =>
      prevCities.map((city) =>
        city.id === id ? { ...city, selected: !city.selected } : city
      )
    );
  };

  const getData = async () => {
    const formData = {
      userid: user,
      countryname: region,
    };

    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_review_for_country.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        setData(response?.data?.User_Data);
        setCityData(response?.data?.User_Data?.cities);
        setSelectedCities(
          response?.data?.User_Data?.cities
            .filter((city) => city.selected)
            .map((city) => city.id)
        );
        setCount(
          response?.data?.User_Data?.cities
            .filter((city) => city.selected)
            .map((city) => city.id)
        );
        setRange1(response?.data?.User_Data?.review?.sightseeng || 0);
        setRange2(response?.data?.User_Data?.review?.people || 0);
        setRange3(response?.data?.User_Data?.review?.quality || 0);
        setRange4(response?.data?.User_Data?.review?.safety || 0);
        setRange5(response?.data?.User_Data?.review?.price || 0);
        setComment(response?.data?.User_Data?.review?.review || "");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCount(cityData.filter((city) => city.selected).map((city) => city.id));
  }, [cityData]);

  useEffect(() => {
    rating();
  }, [data]);

  return (
    <>
      <div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <div style={{ position: "relative" }}>
                {count.length > 0 && (
                  <div className="positionCount">{count.length}</div>
                )}
                <span style={{ fontSize: "18px", marginLeft: "20px" }}>
                  {data?.country?.name}
                </span>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex w-100 cities">
              <div className="city" style={{ width: "42%" }}>
                <div
                  className="d-flex align-items-center px-2 removeParaBottom"
                  style={{
                    height: "50px",
                    borderBottom: "1px solid #e7e7e7",
                    background: "#fff",
                  }}
                >
                  <p>
                    <TiTick size="25" style={{ color: "fda13c" }} />
                    <span style={{ fontSize: "14px" }}>
                      Tick all the places you've visited in the country
                    </span>
                  </p>
                </div>
                <div
                  className="d-flex align-items-center removeParaBottom"
                  style={{ height: "50px", background: "#f3f3f3" }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "100%",
                      background: "#fda13c",
                    }}
                  ></div>
                  <p className="px-2">Main Places</p>
                </div>
                <div className="cityList">
                  {cityData.length > 0 &&
                    cityData.map((ele, index) => {
                      return (
                        <div style={{ position: "relative" }}>
                          <div
                            className="place"
                            key={ele.id}
                            style={{
                              backgroundColor: ele.selected
                                ? "#fbba18"
                                : "transparent",
                            }}
                            onClick={() => handleDivClick(ele.id)}
                          >
                            <span className="name">{ele?.city_name}</span>

                            <div className="checkboxClass">
                              <input
                                type="checkbox"
                                checked={ele?.selected}
                                onChange={() => handleDivClick(ele.id)}
                                id={ele?.id}
                                name="place_5538"
                                disabled={true}
                              />
                              <label for={ele.id}></label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-55 cityDetails" style={{ width: "58%" }}>
                <div className="cityDetails_class">
                  <div className="top-bar">
                    <p> Country</p>
                  </div>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div
                          className="d-flex align-items-center removeParaBottom"
                          style={{ height: "50px", background: "#f3f3f3" }}
                        >
                          <div
                            style={{
                              width: "5px",
                              height: "100%",
                              background: "#fda13c",
                              border: "1px solid #e7e7e7",
                            }}
                          ></div>
                          <div className="d-flex w-100 justify-content-between pe-2">
                            <p
                              className="ps-3"
                              style={{ color: "#525C64", fontSize: "15px" }}
                            >
                              Country rate
                            </p>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="text-center  pt-4 removeParaBottom ">
                          <h3>Reviews and ratings</h3>
                          <div className="d-flex justify-content-center">
                            {/* <h2>4.7 </h2> */}
                            <h4>
                              {rndmArray.map((ele, index) => {
                                if (ratings >= index + 1) {
                                  return (
                                    <AiFillStar style={{ color: "#fbba18" }} />
                                  );
                                }
                              })}
                              {parseInt(ratings) != parseFloat(ratings) && (
                                <FaStarHalf style={{ color: "#fbba18" }} />
                              )}
                            </h4>
                          </div>
                          <hr />
                        </div>

                        <div className="px-5">
                          <div className="d-flex justify-content-between px-1 ">
                            <h6>Sightseeings</h6>
                            <p>{range1}</p>
                          </div>
                          <div className="form-group">
                            <InputRange
                              maxValue={5}
                              minValue={0}
                              value={range1}
                              onChange={(value) => setRange1(value)}
                              step={1}
                              id="range1"
                            />
                          </div>
                        </div>
                        <div className="px-5 mt-3">
                          <div className="d-flex justify-content-between px-1">
                            <h6>Local People</h6>
                            <p>{range2}</p>
                          </div>
                          <div className="form-group">
                            <InputRange
                              maxValue={5}
                              minValue={0}
                              value={range2}
                              onChange={(value) => setRange2(value)}
                              id="range2"
                              step={1}
                            />
                          </div>
                        </div>
                        <div className="px-5 mt-3">
                          <div className="d-flex justify-content-between px-1">
                            <h6>Service Quality</h6>
                            <p>{range3}</p>
                          </div>
                          <div className="form-group ">
                            <InputRange
                              maxValue={5}
                              minValue={0}
                              value={range3}
                              onChange={(value) => setRange3(value)}
                              id="range3"
                              step={1}
                            />
                          </div>
                        </div>
                        <div className="px-5 mt-3">
                          <div className="d-flex justify-content-between px-1">
                            <h6>Safety</h6>
                            <p>{range4}</p>
                          </div>
                          <div className="form-group ">
                            <InputRange
                              maxValue={5}
                              minValue={0}
                              value={range4}
                              onChange={(value) => setRange4(value)}
                              id="range4"
                              step={1}
                            />
                          </div>
                        </div>
                        <div className="px-5 mt-3">
                          <div className="d-flex justify-content-between px-1">
                            <h6>Price</h6>
                            <p>{range5}</p>
                          </div>

                          <div className="form-group">
                            <InputRange
                              maxValue={5}
                              minValue={0}
                              value={range5}
                              onChange={(value) => setRange5(value)}
                              id="range5"
                              step={1}
                            />
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <div className="progressClass pt-2 text-center">
                    <div className="countSection">
                      <div>
                        <h1 style={{ fontSize: "60px" }}>{count.length}</h1>
                        <p>cities</p>
                      </div>
                    </div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div
                            className="d-flex align-items-center removeParaBottom"
                            style={{ height: "50px", background: "#f3f3f3" }}
                          >
                            <div
                              style={{
                                width: "5px",
                                height: "100%",
                                background: "#fda13c",
                                border: "1px solid #e7e7e7",
                              }}
                            ></div>
                            <div className="d-flex w-100 justify-content-between pe-2">
                              <p
                                className="ps-3"
                                style={{ color: "#525C64", fontSize: "15px" }}
                              >
                                Review of Country
                              </p>
                            </div>
                          </div>
                        </Accordion.Header>
                        <AccordionBody
                          style={{ background: "rgb(220, 220, 220)" }}
                        >
                          <div
                            className="w-60"
                            style={{ margin: "auto", padding: "20px 20px" }}
                          >
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                id="exampleTextarea"
                                rows="3"
                                placeholder="Add a review..."
                                value={comment}
                                onChange={handleReview}
                              ></textarea>
                            </div>
                          </div>
                        </AccordionBody>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <div className="text-center">
            <button className="saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CitySelect;
