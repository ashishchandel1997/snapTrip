
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Swal from "sweetalert2";
import GoogleMap from "../components/AuthComponent/MapContainer";
import CustomizeSingleModal from "./CustomizeSingleModal";
import CustomizeMultipleModal from "./CustomizeMultipleModal";
import CustomizeAllModal from "./CustomizeAllModal";
import Snackbar from "../components/AuthComponent/Snackbar";
import NavBar from "../NavBar";
import logo from "../images/Logo- Snaptrip .png";
import start from "../images/starts.webp";
import end from "../images/end.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import logo_1 from "../images/Icon_1.png";
import logo_2 from "../images/Icon_2.png";
import logo_3 from "../images/Icon_3.png";
import logo_4 from "../images/Icon_4.png";
import logo_5 from "../images/Icon_5.png";
import logo_6 from "../images/Icon_6.png";
import logo_7 from "../images/Icon_7.png";
import logo_8 from "../images/Icon_8.png";
import logo_9 from "../images/Icon_9.png";

const TripSummary = ({ user, setUser }) => {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMultiple, setIsOpenMultiple] = useState(false);
  const [isOpenAll, setIsOpenAll] = useState(true);
  const [itenary, setItenary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [singleCity, setSingleCity] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [newTimeline, setnewTimline] = useState([]);
  const [zoomValue, setZoomValue] = useState(5);
  const [timeLineData, setTimeLineData] = useState([]);
  const [data, setData] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [edit_CitiesData, setEdit_CitiesData] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [countryName, setCountryName] = useState("");

  const location = useLocation();
  const receivedData = location?.state;
  const selectedId =
    sessionStorage.getItem("countryID") == undefined
      ? location?.state[0]?.countryid
      : sessionStorage.getItem("countryID");

  let img_Second;

  if (receivedData[0]?.trip_length == "2-4 days") {
    img_Second = logo_3;
  } else if (receivedData[0]?.trip_length == "4-9 days") {
    img_Second = logo_4;
  } else if (receivedData[0]?.trip_length == "9-14 days") {
    img_Second = logo_5;
  }

  const settings = {
    infinite: false,
    speed: 500,
    item: 5,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  const Navigate = useNavigate();

  const handleReplan = () => {
    Navigate("/filteredcountry");
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };
  const handleCloseMultipleSidebar = () => {
    setIsOpenMultiple(false);
  };

  const handleCloseSidebar2 = () => {
    setIsOpenAll(false);
  };

  const handleOpenAll = () => {
    setIsOpenAll(true);
  };

  const saveTripFunc = async (data) => {
    const newdata = JSON.stringify(newTimeline);
    const formData = {
      userid: user,
      countryid: selectedId,
      itinerary: data,
      trip_style: receivedData[0]?.trip_style,
      trip_length: receivedData[0]?.trip_length,
      trip_nature: receivedData[0]?.trip_nature,
      trip_culture: receivedData[0]?.trip_culture,
      timeline: newdata,
    };

    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_save_users_trip.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDisplayText(response?.data?.message);
      setToggle(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleSaveTrip = () => {
    if (user) {
      const jsonString = JSON.stringify(cityData);
      saveTripFunc(jsonString);
    } else {
      setToggle(true);
      setDisplayText("Please Login");
    }
  };

  const open = useCallback(
    (id) => {
      const filterData = citiesData?.filter((ele) => {
        return ele.id === id;
      });
      setSingleCity(filterData);
      setIsOpenMultiple(false);
      setIsOpen(true);
    },
    [citiesData]
  );

  const handleItenaryData = (categories, days, mapArray) => {
    const filteredData = mapArray.filter((ele) => {
      return ele.day !== "Others";
    });

    if (filteredData.length > 0) {
      filteredData.forEach((ele) => {
        const cityNamesArray1 = timeLineData.map((item) => item.city_name);

        const commonCities = filteredData.filter((item) =>
          cityNamesArray1.includes(item.city_name)
        );

        if (commonCities.length > 0) {
          commonCities.forEach((commonCity, index) => {
            const existingIndex = timeLineData.findIndex(
              (item) => item.city_name === commonCity.city_name
            );
            const lastIndex = timeLineData.findLastIndex(
              (item) => item.city_name === commonCity.city_name
            );
            if (existingIndex !== -1) {
              if (index == 0) {
                const arr = [...timeLineData];
                arr.splice(
                  existingIndex,
                  lastIndex + 1 - existingIndex,
                  ...filteredData
                );
                setTimeLineData(arr);
              }
            }
          });
        } else {
          setTimeLineData([...timeLineData, ...filteredData]);
        }
      });
    }

    const updatedTimeline = [...newTimeline];
    const existingIndex = updatedTimeline.findIndex(
      (entry) =>
        entry.id === categories[0].id &&
        entry.city_name === categories[0].city_name
    );

    if (existingIndex !== -1) {
      updatedTimeline[existingIndex].days = days;
    } else {
      updatedTimeline.push({ ...categories[0], days });
    }
    const result = [];
    updatedTimeline.forEach((entry, index) => {
      const days = Number(entry.days);
      for (let i = 0; i < days; i++) {
        result.push({ ...entry, key: i });
      }
    });
    setTimeline(result);
    setnewTimline(updatedTimeline);
    setData([...data, ...filteredData]);
  };

  const handleItenary = () => {
    setItenary(true);
    setCitiesData(newTimeline);
    const arr = timeLineData;
    const newArr = arr.map((ele, index) => ({
      ...ele,
      days: index + 1,
    }));
    setCityData(newArr);
    if (timeLineData.length > receivedData[0]?.trip_length.slice(2, 4)) {
      setPopUp(true);
    }
  };

  const handleView = () => {
    setIsOpen(false);
    setIsOpenMultiple(true);
    if (receivedData?.length > 0 && receivedData[0]?.timeline) {
      const data = JSON.parse(receivedData[0]?.timeline);
      setCitiesData(data);
    } else {
      setCitiesData(newTimeline);
    }
  };


  const getCountryDetail = async () => {
    const formData = {
      countryid: selectedId,
    };
    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_country_trips.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        console.log(response?.data?.User_status)
        setCountryData(response?.data?.User_status);
        setCountryName(response?.data?.User_status?.country_name);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  };
  

  const memoizedCitiesData = useMemo(() => {
    return citiesData;
  }, [citiesData]);

  const memoizedItenary = useMemo(() => {
    return itenary;
  }, [itenary]);

  const getCityDetail = async () => {
    const formData = {
      countryid: selectedId,
    };
    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_sub_destinations.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        setCitiesData(response?.data?.User_status);
        setCityData(response?.data?.User_status);
        setEdit_CitiesData(response?.data?.User_status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showSwal = () => {
    Swal.fire({
      title: `It seems that you really like <strong>${countryName}</strong>! Just to let you know that you have exceeded trip duration according to your chosen trip style.`,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
       `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
    setPopUp(false);
  };

  useEffect(() => {
    getCountryDetail();
    if (receivedData?.length > 0 && receivedData[0]?.timeline) {
      setTimeLineData(receivedData[0]?.itinerary);
      setItenary(true);
      setCityData(receivedData[0]?.itinerary);
      const data = JSON.parse(receivedData[0]?.timeline);
      setCitiesData(data);
    } else {
      getCityDetail();
    }
  }, []);


  return (
    <>
      <div
        style={{ height: "100vh", position: "relative" }}
        className="MapHeight"
      >
        <div className="trip-container">
          {citiesData.length > 0 && (
            <div>
              <GoogleMap
                open={open}
                itenary={memoizedItenary}
                showData={memoizedCitiesData}
                zoomValue={zoomValue}
              />
            </div>
          )}

          <div>
            <div className="customizeMap2">
              <div
                className="d-flex justify-content-center align-items-center py-3 px-5 w-100"
                style={{ margin: "auto"}}
              >
                <ul
                  className="timelines timeline"
                  style={{
                    overflowX: timeLineData.length > 6 ? "auto" : "hidden",
                    justifyContent: timeLineData.length > 6 ? "" : "center",
                    display: "flex"
                  }}
                >
                  {timeLineData.map((ele, index) => {
                    return (
                      <li
                        className="li complete"
                        onClick={() => {
                          if (ele.attractions.length > 0) {
                            setCitiesData(ele.attractions);
                            setZoomValue(14);
                          } else {
                            setCitiesData([ele]);
                            setZoomValue(6);
                          }
                        }}
                      >
                        <div className="timestamp ">
                          <span className="author">Day {index + 1}</span>
                        </div>
                        <div className="status">
                          {index == 0 && (
                            <span className="startPosition">
                              <img src={start} className="startImage" />
                            </span>
                          )}
                          {index == timeLineData.length - 1 && (
                            <span className="endPosition">
                              <img src={end} className="imageEnd" />
                            </span>
                          )}
                          <h6>{ele?.city_name}</h6>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="d-flex">
                  {timeLineData.length > 0 && (
                    <div>
                      {itenary ? (
                        <button className="let-btn2 ms-5" onClick={handleView}>
                          View Itenary
                        </button>
                      ) : (
                        <button
                          className="let-btn2 ms-5"
                          onClick={handleItenary}
                        >
                          Confirm Itenary
                        </button>
                      )}
                    </div>
                  )}
                  {timeLineData.length > 0 && !receivedData[0]?.added_at && (
                    <button
                      className="let-btn2 ms-2"
                      onClick={() => {
                        setCitiesData(edit_CitiesData);
                        setZoomValue(7);
                        setItenary(false);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-5">
                <div className="Selection_div">
                  <div className="d-flex justify-content-center align-items-center w-25">
                    <img
                      src={
                        receivedData[0]?.trip_style === "Intense"
                          ? logo_1
                          : logo_2
                      }
                      className="inner_div_image"
                    />
                    <div className="d-flex flex-column">
                      <h5 style={{ fontSize: "13px", fontWeight: "bold" }}>
                        Trip Style
                      </h5>
                      <h6 style={{ fontSize: "12px" }}>
                        {receivedData?.trip_style} {receivedData[0]?.trip_style}
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center w-25">
                    <img src={img_Second} className="inner_div_image" />
                    <div className="d-flex flex-column">
                      <h5 style={{ fontSize: "13px", fontWeight: "bold" }}>
                        Duration
                      </h5>
                      <h6 style={{ fontSize: "12px" }}>
                        {receivedData?.trip_length}
                        {receivedData[0]?.trip_length}
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center w-25">
                    <img
                      src={
                        receivedData[0]?.trip_nature === "Unmissable"
                          ? logo_6
                          : logo_7
                      }
                      className="inner_div_image"
                    />
                    <div className="d-flex flex-column">
                      <h5 style={{ fontSize: "13px", fontWeight: "bold" }}>
                        Nature
                      </h5>
                      <h6 style={{ fontSize: "12px" }}>
                        {receivedData?.trip_nature}
                        {receivedData[0]?.trip_nature}
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center w-25">
                    <img
                      src={
                        receivedData[0]?.trip_culture === "A lot more"
                          ? logo_8
                          : logo_9
                      }
                      className="inner_div_image"
                    />
                    <div className="d-flex flex-column">
                      <h5 style={{ fontSize: "13px", fontWeight: "bold" }}>
                        Culture
                      </h5>
                      <h6 style={{ fontSize: "12px" }}>
                        {receivedData?.trip_culture}
                        {receivedData[0]?.trip_culture}
                      </h6>
                    </div>
                  </div>
                </div>
                {!receivedData[0]?.added_at && (
                  <div>
                    <button className="re_plan" onClick={handleReplan}>
                      Re-plan
                    </button>
                    {itenary && (
                      <button className="re_plan ms-3" onClick={handleSaveTrip}>
                        Save Your Trip
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`scrollbar1 sidebar ${isOpen ? "open" : ""}`}>
            <CustomizeSingleModal
              handleCloseSidebar={handleCloseSidebar}
              data2={singleCity}
              handleItenaryData={handleItenaryData}
              trip_style={receivedData[0]?.trip_style}
              itenary={itenary}
            />
          </div>
          <div className={`scrollbar1 sidebar ${isOpenMultiple ? "open" : ""}`}>
            <CustomizeMultipleModal
              handleCloseSidebar={handleCloseMultipleSidebar}
              citiesData={cityData}
            />
          </div>
          <div className={`scrollbar1 sidebar2 ${isOpenAll ? "open2" : ""}`}>
            <CustomizeAllModal
              handleCloseSidebar={handleCloseSidebar2}
              allData={countryData}
              user={user}
            />
          </div>
          <div className=" linkClass absolute_snap">
            <NavBar user={user} setUser={setUser} />
          </div>
          <div className="absoluteButton" onClick={handleOpenAll}>
            <span style={{ fontSize: "40px" }}>{`<`}</span>
          </div>
        </div>
        <div
          class="loader-container"
          style={{ display: loading ? "block" : "none" }}
        >
          <div class="loader"></div>
          <img className="image1" src={logo} alt="Your Image" />
        </div>
        {toggle && <Snackbar setToggle={setToggle} displayText={displayText} />}
      </div>
      {popUp && showSwal()}
      {/* <button onClick={showSwal}>Show SweetAlert2 modal</button> */}
    </>
  );
};

export default TripSummary;
