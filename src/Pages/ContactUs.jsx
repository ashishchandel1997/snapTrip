import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NavBar from "../NavBar";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";

const ContactUs = ({ user, setUser }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [inputFields, setInputFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(e.target.value);
    if (name === "first_name") {
      setInputFields({ ...inputFields, [name]: value });
    }
    if (name === "last_name") {
      setInputFields({ ...inputFields, [name]: value });
    }
    if (name === "message") {
      setInputFields({ ...inputFields, [name]: value });
    }
    if (name === "email") {
      setInputFields({ ...inputFields, [name]: value });
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const validateForm = () => {
    let validationErrors = {};

    if (inputFields.first_name.trim() === "") {
      validationErrors.first_name = "First Name is required";
    }

    if (inputFields.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputFields.email)
    ) {
      validationErrors.email = "Invalid email format";
    }
    if (phoneNumber === "") {
      validationErrors.phoneNumber = "phoneNumber is required";
    }

    if (inputFields.message === "") {
      validationErrors.message = "Message is required";
    }

    setErrors(validationErrors);

    console.log(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        first_name: inputFields.first_name,
        last_name: inputFields.last_name,
        email: inputFields.email,
        phone: phoneNumber,
        message: inputFields.message,
      };
      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_contact_us.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          alert(response.data.message);
          setInputFields({
            first_name: "",
            last_name: "",
            email: "",
            message: "",
          });
          setPhoneNumber("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Form is not valid. Please check the errors.");
    }
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <div className="container py-5 mt-5" style={{ background: "#15b2c6" }}>
        <div className="d-flex justify-content-between mb-5 px-4">
          <div style={{ color: "#fff" }}>
            <MdLocationPin size={20} />
            <span style={{ fontWeight: "500", color: "#fff" }}>Cork, Republic of Ireland</span>
            {/* <p style={{paddingLeft:"6px", color: "#fff" }}>
              Cork, Republic of Ireland
            </p> */}
          </div>

          <div className="abt">
            <div className="abtSmall">
              <p className="rotate_para">Contact us</p>
            </div>
            <div className="abtLarge">
              <div className="me-4">
                <BiSolidPhoneCall size={40} />
              </div>
              <div>
                <p style={{ color: "#fff", marginBottom: "5px" }}>
                  For Partnership Enquiries
                </p>
                <hr />
                <a
                  className="email_hover"
                  href="mailto:support@snaptrip.io"
                  style={{
                    color: "#fff",
                    marginBottom: "5px",
                    marginRight: "20px",
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                >
                  support@snaptrip.io
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="login-container2" style={{ padding: "70px" }}>
          <form>
            <div className="input-group2 login100-form">
              <div className="wrap-input100 validate-input">
                <input
                  type="text"
                  placeholder="Name"
                  name="first_name"
                  value={inputFields.first_name}
                  className="input100"
                  onChange={handleChange}
                />
                <span className="focus-input100"></span>
                {errors.first_name && (
                  <p className="error">{errors.first_name}</p>
                )}
              </div>
              <div className="wrap-input100 validate-input mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={inputFields.email}
                  onChange={handleChange}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="wrap-input100 validate-input mt-3">
                <input
                  type="textarea"
                  placeholder="Comment"
                  name="message"
                  value={inputFields.message}
                  onChange={handleChange}
                  className="input100 text_area"
                />
                <span className="focus-input100"></span>
                {errors.message && <p className="error">{errors.message}</p>}
              </div>
            </div>
            <div>
              <label>
                <div className=" mt-1 mb-4" style={{ width: "558px" }}>
                  <PhoneInput
                    className=""
                    country={"in"}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    inputProps={{
                      required: true,
                    }}
                  />
                </div>
              </label>
              {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>
          </form>
          <div className="text-center">
            <button
              className="continueBtn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
