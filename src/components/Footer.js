import React from "react";
import { Link } from "react-router-dom";
import image_logo2 from "../images/logooooooooooooooooooooooo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handlePrivacy = () => {
    navigate("/privacy");
  };

  const handleTerm = () => {
    navigate("/terms&conditions");
  };
  return (
    <footer
      id="footer"
      className="border-secondary-subtle"
      style={{ backgroundColor: "#006B7E" }}
    >
      <div className="container pt-4">
        <div className="row mt-5 ">
          <div className="col-md-5">
            <div className="mb-8" style={{ color: "#fff" }}>
              <Link
                className="d-flex align-items-center fs-3 fw-semibold text-white"
                style={{ textDecoration: "none" }}
              >
                <img src={image_logo2} style={{ width: "50px" }} />
                <span>SnapTrip</span>
              </Link>
              <p>
                <span style={{ color: "#fff" }}>Cork, Republic of Ireland</span>
              </p>
              <p>
                <Link
                  className=" link-hover-primary eleHover"
                  style={{ color: "#fff" }}
                >
                  support@snaptrip.io
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-3 ps-5">
            <div className="mb-8">
              <h5 className="fs-3" style={{ color: "#fff" }}>
                Quick Links
              </h5>
              <div className="row">
                <div className="">
                  <ul className="nav flex-column pe-4">
                    <li className="nav-item anchor">
                      <Link
                        className="nav-link link-hover-primary ps-0 pe-0 eleHover"
                        to="/about"
                        style={{ color: "#fff" }}
                      >
                        About us
                      </Link>
                    </li>
                    <li className="nav-item anchor">
                      <Link
                        className="nav-link  link-hover-primary ps-0 pe-0 eleHover"
                        to="/blogs"
                        style={{ color: "#fff" }}
                      >
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item anchor">
                      <Link
                        to="/contactUs"
                        className="nav-link link-hover-primary ps-0 pe-0 eleHover"
                        style={{ color: "#fff" }}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className="nav-item anchor">
                      <Link
                        className="nav-link link-hover-primary ps-0 pe-0 eleHover "
                        style={{ color: "#fff" }}
                      >
                        My Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <div className="mb-8">
              <h5 className="fs-3" style={{ color: "#fff" }}>
                Support
              </h5>
              <div className="pt-2 para_para">
                <p
                  style={{ color: "#fff", fontSize: "16px" }}
                  className=" link-hover-primary eleHover"
                  onClick={handlePrivacy}
                >
                  Privacy Policy
                </p>
                <p
                  style={{ color: "#fff", fontSize: "16px" }}
                  className=" link-hover-primary eleHover mt-3"
                  onClick={handleTerm}
                >
                  Terms Of Use
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-body-tertiary d-flex justify-content-start">
          <p style={{ color: "#fff" }}>© 2023 SnapTrip. All rights reserved.</p>
          <ul className="list-inline">
            <li className="list-inline-item"></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
