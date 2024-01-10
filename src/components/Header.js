import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  FaUser,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaChevronDown,
} from "react-icons/fa";
import banner from "../images/banner.jpg";
import logo_image from "../images/Logo- Snaptrip .png";
import axios from "axios";
import { FaHamburger } from "react-icons/fa";

const Header = ({ user, setUser }) => {
  const [scrollClass, setScrollClass] = useState("");
  const [btnColor, setbtnColor] = useState("");
  const [bannerImg, setBannerImg] = useState();
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const baseUrl = "https://argosmob.uk/snaptrip/admin/img/avatars/";
  const pro=sessionStorage.getItem("pro")

  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    const confirm = window.confirm("Are are Sure?");
    if (confirm) {
      navigate("/login");
      sessionStorage.clear("user");
      sessionStorage.clear("pro");
      setUser("");
      alert("Successfully Logged Out");
    }
  };

  const handleSelect = (e) => {
    const [selectedid, selectedname] = e.target.value.split("-");
    sessionStorage.setItem("countryID", selectedid);
    sessionStorage.setItem("countryName", selectedname);
    setSelectedId(selectedid);
  };

  const handleSelectedId = () => {
    if (selectedId) {
      navigate("/filteredCountry");
      setSelectedId(null);
    }
  };

  const getBanner = () => {
    axios
      .get("https://www.argosmob.uk/snaptrip//snaptrip_get_banners.php")
      .then((res) => {
        setBannerImg(res?.data?.User_status?.[0].large_img);
      })
      .catch((err) => {
        console.log("error", err);
      });
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
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.9) {
        setScrollClass("scrolled");
        setbtnColor("btncolor");
      } else {
        setScrollClass("");
        setbtnColor("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getBanner();
    getCountry();
  }, []);

  return (
    <>
      <header>
        <div className="main-menu-div  w-100">
          <nav
            className="navbar navbar-expand-lg navbar-light"
            id={`${scrollClass}`}
            style={{ margin: "0px", padding: "0px" }}
          >
            <div className="container linkClass">
              <Link
                className="navbar-brand lh-sm fontWeights"
                style={{ margin: "0px", padding: "0px" }}
                to="/"
              >
                <img
                  src={logo_image}
                  alt="logo-image"
                  style={{ width: "100px" }}
                />
              </Link>
              <div className="right-src ">
                <ul className="d-flex align-items-center list-unstyled mb-0">
                  <li>
                    <Link
                      to="/chartmap"
                      id={`${btnColor}`}
                      style={{
                        textDecorationLine: "none",
                        fontSize: "16px",
                        marginRight: "15px",
                      }}
                    >
                      Chart Map
                    </Link>
                  </li>
                  <li className="nav-item">
                    <div className="dropdown">
                      <button className="dropbtn" id={`${btnColor}`}>
                      Plan Your Next Trip
                        <span className="ps-2">
                          <FaChevronDown />
                        </span>
                      </button>
                      <div className="dropdown-content linkClass">
                        <Link to="/smarttrip">Plan Your Trip</Link>
                        <Link to="/howSnaptripworks">How Snaptrip Works</Link>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="dropdown">
                      <button className="dropbtn" id={`${btnColor}`}>
                        About
                        <span className="ps-2">
                          <FaChevronDown />
                        </span>
                      </button>
                      <div className="dropdown-content linkClass">
                        <Link to="/about">About Us</Link>
                        <Link to="/blogs">SnapTrip Blog</Link>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="dropdown">
                    <Link to="/login" className={pro?"":"lgn-btn"}>
                      {pro?<img src={`${baseUrl}${pro}`} className="login_Image"/>:<FaUser />} 
                    </Link>
                      {user && (
                        <div className="dropdown-content2 linkClass">
                          <Link to="/profile">Profile</Link>
                          <Link to="/wishlist">Wishlist</Link>
                          <Link to="/savedTrips">Your Trips</Link>
                          <button
                            className="w-100"
                            style={{ textAlign: "left" }}
                            onClick={handleLogout}
                          >
                            <Link>Logout</Link>
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div></div>

        <nav className="navbarr">
          <div className="containerr">
            <div className="logos">
              <Link
                className="navbar-brand lh-sm fontWeights"
                style={{ margin: "0px", padding: "0px" }}
                to="/"
              >
                <img src={logo_image} className="img_logo_tag" />
                {/* <span className="prime_color">snapTrip</span> */}
              </Link>
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
              <FaHamburger className="secondary_color" />
            </div>
            <div className={`nav-elements  ${showNavbar && "active"}`}>
              <ul>
                <li>
                  <Link to="/smarttrip">Smart Trip Guide</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/blogs">SnapTrip Blog</Link>
                </li>
                {user && (
                  <>
                    <li>
                      {" "}
                      <Link to="/chartmap">Chart Map</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link to="/profile">Profile</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link to="/wishlist">Wishlist</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link to="/savedTrips">Your Trips</Link>{" "}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="banner-home">
        <div className="banner-slider-m">
          <img src={banner} className="d-block w-100" alt="..." />
          {/* src={`https://argosmob.uk/snaptrip/admin/uploads/banner/${bannerImg}`} */}
        </div>
        <div className="banner-content">
          <div className="container">
            {/* <h1 style={{fontSize:"43px"}}>{`Do you want to`}</h1>
            <h1>
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  strings: [" Explore, Travel, Indulge, Experience, Savour, Feel, …"],
                }}
              />
            </h1> */}
            <div className="d-flex mobile_div">
              <h1
                className="mobile_h1"
                style={{ fontSize: "60px", marginRight: "15px" }}
              >{`Do you want to`}</h1>
              <h1>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    strings: [
                      "Explore",
                      "Travel",
                      "Indulge",
                      "Experience",
                      "Savour",
                      "Feel",
                    ],
                  }}
                />
              </h1>
            </div>
            <p>
              Say goodbye to endless trip planning and hello to enjoying every
              moment. SnapTrip is here to make your travel dreams come true,
              effortlessly.
            </p>
            <div className="col-md-12 col-xl-6 mt-4">
              <div className="form-divs">
                <div className="row g-lg-5">
                  <div className="col-md-9 afterLine">
                    <div className="comon-sc">
                      <div className="form-group">
                        <label className="mb-2">Where You go?</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleSelect}
                        >
                          <option>select destination</option>
                          {options.map((ele) => {
                            return (
                              <option value={`${ele?.id}-${ele?.name}`}>
                                {ele.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-center flex">
                    <button className="searchBT" onClick={handleSelectedId}>
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="socal-divs1-banner posi_fixed">
          <ul className="m-0 list-unstyled">
            <li className="linkClass">
              <a target="_blank" href="https://www.facebook.com/profile.php?id=61554349679322">
                <FaFacebookF className="fbHover" size={25} />
              </a>
            </li>
            <li className="linkClass">
            <a target="_blank" href="https://www.instagram.com/snaptrip_io/">
                <FaInstagram className="instaHover" size={25}/>
              </a>
            </li>
            <li className="linkClass">
            <a target="_blank" href="https://www.twitter.com">
                <FaTwitter className="twitterHover" size={25} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
