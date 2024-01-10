import React, { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import Snackbar from "./AuthComponent/Snackbar";
import axios from "axios";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);
  const [displayText, setdisplayText] = useState("");

  const validateEmail = () => {
    if (email == "") {
      alert("please fill email");
      return false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      alert("please enter valid email");
      return false;
    }
    return true;
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();

    if (validateEmail()) {
      const formData = {
        email: email,
      };
      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_subscribe_news_letter.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.data?.success) {
          console.log(response?.data);
          setToggle(true);
          setdisplayText("Successfully Registered");
          setEmail("");
        } else {
          alert(response?.data?.message);
          setEmail("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <React.Fragment>
      <h2 className="headingText text-center mb-5">
        Ready to Change How You Travel?
      </h2>
      <section className="" style={{ height: "200px", background: "#15b2c6" }}>
        <section className="container">
          <section className="row" style={{ height: "200px" }}>
            <div
              className="col-md-6 d-flex align-items-center"
              style={{ margin: "auto" }}
            >
              <MdMarkEmailRead size={50} style={{ color: "#fff" }} />
              <div style={{ color: "#fff" }} className="ms-3">
                <h4>Your Travel Journey Starts Here</h4>
                <h5>Stay Up to date</h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="offset-lg-2 mt-5">
                <div className="input-group">
                  <input
                    style={{ height: "70px" }}
                    type="text"
                    className="form-control border rounded-pill"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button
                    className="button_effect2 m-3"
                    type="submit"
                    style={{ zIndex: "99" }}
                    onClick={handleNewsletter}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      {toggle && <Snackbar setToggle={setToggle} displayText={displayText} />}
    </React.Fragment>
  );
};

export default NewsLetter;
