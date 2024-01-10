import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import logo_image from "./images/Logo- Snaptrip .png";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const Navigate = useNavigate();
  const baseUrl = "https://argosmob.uk/snaptrip/admin/img/avatars/";
  const pro=sessionStorage.getItem("pro")

  const handleLogout = () => {
    const confirm = window.confirm("Are are Sure?");
    if (confirm) {
      Navigate("/login");
      setUser("");
      alert("Successfully Logged Out");
      sessionStorage.clear("user");
      sessionStorage.clear("pro");
    }
  };
  return (
    <div>
      <div className="main-menu-div  w-100" style={{ color: "#ffa500" }}>
        <nav
          className="navbar navbar-expand-lg navbar-light nab"
          style={{ margin: "0px", padding: "0px" }}
        >
          <div className="container">
            <Link
              className="navbar-brand"
              to="/"
              style={{ margin: "0px", padding: "0px" }}
            >
              <img
                src={logo_image}
                style={{ width: "100px" }}
                alt="logo_image"
              />
            </Link>
            <div className="right-src ">
              <ul className="d-flex align-items-center list-unstyled mb-0">
                <li>
                  <Link
                    to="/chartmap"
                    style={{
                      textDecorationLine: "none",
                      fontSize: "16px",
                      color: "#006B7E",
                      marginRight: "15px",
                    }}
                  >
                    Chart Map
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button className="dropbtn2">
                    Plan Your Next Trip
                      <span className="ps-2">
                        <FaChevronDown />
                      </span>
                    </button>
                    <div className="dropdown-content">
                      <Link to="/smarttrip">Plan Your Trip</Link>
                      <Link to="/howSnaptripworks">How Snaptrip Works</Link>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button className="dropbtn2">
                      About
                      <span className="ps-2">
                        <FaChevronDown />
                      </span>
                    </button>
                    <div className="dropdown-content">
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
    </div>
  );
};

export default NavBar;
