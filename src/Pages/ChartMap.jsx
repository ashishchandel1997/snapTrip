import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import CitySelect from "./CitySelect";
import Map from "./Map";
import NavBar from "../NavBar";
import logo_image from "../images/logooooooooooooooooooooooo.png";
import defaultPic from "../images/user.jpg";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const getData = () => {
  return [
    ["Country", "status", "Visited"],
    ["Afghanistan", 0, 0],
    ["Albania", 0, 0],
    ["Algeria", 0, 0],
    ["Andorra", 0, 0],
    ["Angola", 0, 0],
    ["Antarctica", 0, 0],
    ["Argentina", 0, 0],
    ["Armenia", 0, 0],
    ["Australia", 0, 0],
    ["Austria", 0, 0],
    ["Azerbaijan", 0, 0],
    ["Bahamas", 0, 0],
    ["Bahrain", 0, 0],
    ["Bangladesh", 0, 0],
    ["Barbados", 0, 0],
    ["Belarus", 0, 0],
    ["Belgium", 0, 0],
    ["Belize", 0, 0],
    ["Benin", 0, 0],
    ["Bhutan", 0, 0],
    ["Bolivia", 0, 0],
    ["Bosnia and Herzegovina", 0, 0],
    ["Botswana", 0, 0],
    ["Brazil", 0, 0],
    ["Brunei", 0, 0],
    ["Bulgaria", 0, 0],
    ["Burkina Faso", 0, 0],
    ["Burundi", 0, 0],
    ["Cabo Verde", 0, 0],
    ["Cambodia", 0, 0],
    ["Cameroon", 0, 0],
    ["Canada", 0, 0],
    ["CD", 0, 0],
    ["Central African Republic", 0, 0],
    ["CG", 0, 0],
    ["Chad", 0, 0],
    ["Chile", 0, 0],
    ["China", 0, 0],
    ["CI", 0, 0],
    ["Colombia", 0, 0],
    ["Comoros", 0, 0],
    ["Costa Rica", 0, 0],
    ["Croatia", 0, 0],
    ["Cuba", 0, 0],
    ["Cyprus", 0, 0],
    ["Czech Republic", 0, 0],
    ["Denmark", 0, 0],
    ["Djibouti", 0, 0],
    ["Dominica", 0, 0],
    ["Dominican Republic", 0, 0],
    ["Ecuador", 0, 0],
    ["Egypt", 0, 0],
    ["El Salvador", 0, 0],
    ["Equatorial Guinea", 0, 0],
    ["Eritrea", 0, 0],
    ["Estonia", 0, 0],
    ["Eswatini", 0, 0],
    ["Ethiopia", 0, 0],
    ["Falkland Islands", 0, 0],
    ["Fiji", 0, 0],
    ["Finland", 0, 0],
    ["France", 0, 0],
    ["French Guiana", 0, 0],
    ["Gabon", 0, 0],
    ["Gambia", 0, 0],
    ["Georgia", 0, 0],
    ["Germany", 0, 0],
    ["Ghana", 0, 0],
    ["Greece", 0, 0],
    ["Greenland", 0, 0],
    ["Grenada", 0, 0],
    ["Guatemala", 0, 0],
    ["Guinea", 0, 0],
    ["Guinea-Bissau", 0, 0],
    ["Guyana", 0, 0],
    ["Haiti", 0, 0],
    ["Honduras", 0, 0],
    ["Hungary", 0, 0],
    ["Iceland", 0, 0],
    ["India", 0, 0],
    ["Indonesia", 0, 0],
    ["Iran", 0, 0],
    ["Iraq", 0, 0],
    ["Ireland", 0, 0],
    ["Israel", 0, 0],
    ["Italy", 0, 0],
    ["Jamaica", 0, 0],
    ["Japan", 0, 0],
    ["Jordan", 0, 0],
    ["Kazakhstan", 0, 0],
    ["Kenya", 0, 0],
    ["Kiribati", 0, 0],
    ["Kosovo", 0, 0],
    ["Kuwait", 0, 0],
    ["Kyrgyzstan", 0, 0],
    ["Laos", 0, 0],
    ["Latvia", 0, 0],
    ["Lebanon", 0, 0],
    ["Lesotho", 0, 0],
    ["Liberia", 0, 0],
    ["Libya", 0, 0],
    ["Liechtenstein", 0, 0],
    ["Lithuania", 0, 0],
    ["Luxembourg", 0, 0],
    ["Madagascar", 0, 0],
    ["Malawi", 0, 0],
    ["Malaysia", 0, 0],
    ["Maldives", 0, 0],
    ["Mali", 0, 0],
    ["Malta", 0, 0],
    ["Marshall Islands", 0, 0],
    ["Mauritania", 0, 0],
    ["Mauritius", 0, 0],
    ["Mexico", 0, 0],
    ["Micronesia", 0, 0],
    ["MK", 0, 0],
    ["Moldova", 0, 0],
    ["Monaco", 0, 0],
    ["Mongolia", 0, 0],
    ["Montenegro", 0, 0],
    ["Morocco", 0, 0],
    ["Mozambique", 0, 0],
    ["Myanmar", 0, 0],
    ["Namibia", 0, 0],
    ["Nauru", 0, 0],
    ["Nepal", 0, 0],
    ["Netherlands", 0, 0],
    ["New Zealand", 0, 0],
    ["Nicaragua", 0, 0],
    ["Niger", 0, 0],
    ["Nigeria", 0, 0],
    ["North Korea", 0, 0],
    ["Norway", 0, 0],
    ["Oman", 0, 0],
    ["Pakistan", 0, 0],
    ["Palau", 0, 0],
    ["Palestine", 0, 0],
    ["Panama", 0, 0],
    ["Papua New Guinea", 0, 0],
    ["Paraguay", 0, 0],
    ["Peru", 0, 0],
    ["Philippines", 0, 0],
    ["Poland", 0, 0],
    ["Portugal", 0, 0],
    ["Qatar", 0, 0],
    ["Romania", 0, 0],
    ["Russia", 0, 0],
    ["Rwanda", 0, 0],
    ["Saint Kitts and Nevis", 0, 0],
    ["Saint Lucia", 0, 0],
    ["Saint Vincent and the Grenadines", 0, 0],
    ["Samoa", 0, 0],
    ["San Marino", 0, 0],
    ["Sao Tome and Principe", 0, 0],
    ["Saudi Arabia", 0, 0],
    ["Senegal", 0, 0],
    ["Serbia", 0, 0],
    ["Seychelles", 0, 0],
    ["Sierra Leone", 0, 0],
    ["Singapore", 0, 0],
    ["Slovakia", 0, 0],
    ["Slovenia", 0, 0],
    ["Solomon Islands", 0, 0],
    ["Somalia", 0, 0],
    ["South Africa", 0, 0],
    ["South Korea", 0, 0],
    ["Spain", 0, 0],
    ["Sri Lanka", 0, 0],
    ["SS", 0, 0],
    ["Sudan", 0, 0],
    ["Suriname", 0, 0],
    ["Sweden", 0, 0],
    ["Switzerland", 0, 0],
    ["Syria", 0, 0],
    ["Taiwan", 0, 0],
    ["Tajikistan", 0, 0],
    ["Tanzania", 0, 0],
    ["Thailand", 0, 0],
    ["Timor-Leste", 0, 0],
    ["Togo", 0, 0],
    ["Tonga", 0, 0],
    ["Trinidad and Tobago", 0, 0],
    ["Tunisia", 0, 0],
    ["Turkey", 0, 0],
    ["Turkmenistan", 0, 0],
    ["Tuvalu", 0, 0],
    ["Uganda", 0, 0],
    ["Ukraine", 0, 0],
    ["United Arab Emirates", 0, 0],
    ["United Kingdom", 0, 0],
    ["United States", 0, 0],
    ["Uruguay", 0, 0],
    ["Uzbekistan", 0, 0],
    ["Vanuatu", 0, 0],
    ["Vatican City", 0, 0],
    ["Venezuela", 0, 0],
    ["Vietnam", 0, 0],
    ["Western Sahara", 0, 0],
    ["Yemen", 0, 0],
    ["Zambia", 0, 0],
    ["Zimbabwe", 0, 0],
  ];
};
const Chartmap = ({ user, setUser }) => {
  const [toggle, setToggle] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const [regionData, setRegionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState(getData());
  const [visitedData, setVisitedData] = useState([]);
  const [profilePic, setProfile] = useState("");
  const [imgs, setImgs] = useState("");

  const imageRef = useRef(null);
  const [totalCities, setTotalCities] = useState(0);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const showMap = () => {
    setToggleMap(true);
    setIsLoading(true);
  };

  const handleSaveApi = (data) => {
    setTotalCities(data);
  };

  const getCities = async () => {
    const formData = {
      userid: user,
    };

    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_visited_countries_2.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        setVisitedData(response.data?.User_status);
        const imgurl = `https://argosmob.uk/snaptrip/admin/img/avatars/${response.data?.User_status?.profile}`;
        if (response.data?.User_status?.profile) {
          const convertToBase64 = async () => {
            try {
              const response = await fetch(imgurl);

              if (!response.ok) {
                throw new Error(
                  `Failed to fetch image. Status: ${response.status}`
                );
              }
              const blob = await response.blob();
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64Data = reader.result;
                setProfile(base64Data);
                setImgs(base64Data);
              };
              reader.readAsDataURL(blob);
            } catch (error) {
              console.error("Error converting image to base64:", error);
            }
          };
          convertToBase64();
        }
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const getChartApi = async () => {
    const formData = {
      userid: user,
    };

    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_visited_countries.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        setCountryData(response.data?.User_status);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getChartApi();
    getCities();
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="Absolute_saveButton">
        <button onClick={showMap} className="saveButton2" disabled={isLoading}>
          {isLoading ? (
            <div className="loader3"></div>
          ) : (
            "Flaunt your Global Footprint"
          )}
        </button>
      </div>
      <div style={{ position: "relative" }} className="mb-5">
        <div className=" mapDiv" style={{ zIndex: "500" }}>
          <Chart
            width={"100%"}
            height={"750px"}
            chartType="GeoChart"
            data={countryData}
            options={{
              colorAxis: {
                minValue: 0,
                maxValue: 4,
                // colors: ["lightgray", "#fbba18", "#fbba18"],
                colors: [
                  "lightgray",
                  "#fcd269",
                  "#fccb52",
                  "#fcc43b",
                  "#fbba18",
                ],
              },
              backgroundColor: "#fff",
              datalessRegionColor: "#fff",
              defaultColor: "pink",
              legend: "none",
            }}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = countryData[selection[0].row + 1];
                  setToggle(true);
                  setRegionData(region?.[0]);
                },
              },
            ]}
          />
          <div className="left_info">
            <p className="mb-1" style={{ color: "black" }}>
              MAP LEGEND
            </p>
            <div className="d-flex mb-1">
              <div className="color_div1"></div>-<div>know every corner</div>
            </div>
            <div className="d-flex mb-1">
              <div className="color_div2"></div>-<div> traveled thoroughly</div>
            </div>
            <div className="d-flex mb-1">
              <div className="color_div3"></div>-<div>saw a bit</div>
            </div>
            <div className="d-flex">
              <div className="color_div4"></div>-<div>visited</div>
            </div>
          </div>
        </div>
        <div ref={imageRef}>
          <div style={{ position: "relative" }}>
            <div className="AbsoluteDiv2" style={{ zIndex: "1" }}>
              <img src={logo_image} style={{ width: "50px" }} />
              <h1 className="mt-5">{visitedData?.visited_country}</h1>
              <h4 className="mb-5" style={{ color: "#fff" }}>
                COUNTRIES/{visitedData?.average} %
              </h4>
              <h1>{visitedData?.visited_city}</h1>
              <h4 style={{ color: "#fff" }}>CITIES</h4>
            </div>
            <div className="AbsoluteDiv" style={{ zIndex: "1" }}>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <img
                    src={profilePic ? profilePic : defaultPic}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <h4 className="ms-2">{visitedData?.first_name}</h4>
              </div>
            </div>
            <Chart
              width={"100%"}
              height={"650px"}
              data={countryData}
              chartType="GeoChart"
              options={{
                colorAxis: {
                  minValue: 0,
                  maxValue: 4,
                  colors: [
                    "lightgray",
                    "#fcd269",
                    "#fccb52",
                    "#fcc43b",
                    "#fbba18",
                  ],
                },
                backgroundColor: "#006B7E",
                // backgroundColor: "#15b2c6",
                datalessRegionColor: "#fff",
                defaultColor: "pink",
                legend: "none",
              }}
              chartEvents={[
                {
                  eventName: "select",
                },
              ]}
            />
          </div>
        </div>
      </div>
      {toggle && (
        <CitySelect
          setToggle={setToggle}
          getChartApi={getChartApi}
          region={regionData}
          user={user}
          getCities={getCities}
        />
      )}
      {toggleMap && (
        <Map
          setToggleMap={setToggleMap}
          chartRef={imageRef}
          setIsLoading={setIsLoading}
          toggleMap={toggleMap}
          totalCities={totalCities}
          visitedData={visitedData}
          user={user}
        />
      )}
      {!user && (
        <div className="popUp">
          <Modal show={true} size="sm" centered>
            <Modal.Body>
              <h3 className="text-center">Please Login First</h3>
              <div className="text-center">
                <button className="readBtn" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Chartmap;
