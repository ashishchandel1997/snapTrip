import React, { useState } from "react";
import NavBar from "../../NavBar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ user, setUser }) => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange1 = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName") {
      setInputData({ ...inputData, [name]: value });
    }
    if (name === "lastName") {
      setInputData({ ...inputData, [name]: value });
    }
    if (name === "mobile") {
      setInputData({ ...inputData, [name]: value });
    }
    if (name === "email") {
      setInputData({ ...inputData, [name]: value });
    }
    if (name === "password") {
      setInputData({ ...inputData, [name]: value });
    }
    if (name === "confirmPassword") {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (inputData.firstName.trim() === "") {
      validationErrors.firstName = "First Name is required";
    }

    if (inputData.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputData.email)
    ) {
      validationErrors.email = "Invalid email format";
    }
    if (phoneNumber === "") {
      validationErrors.phoneNumber = "phoneNumber is required";
    }

    if (inputData.password === "") {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        name: inputData.firstName,
        email: inputData.email,
        phone: phoneNumber,
        password: inputData.password,
      };

      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_register_user.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          alert(response.data.message);
          setInputData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setPhoneNumber("");
          navigate("/login");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Form is not valid. Please check the errors.");
    }
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="mainDiv">
        <div className="login-container2">
          <h1 className="mt-4 mb-4">Ready to embark on your journey?</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group2 login100-form">
              <label className="mb-4">Finish Registration</label>
              <div className="wrap-input100 validate-input">
                <input
                  type="text"
                  placeholder="Name"
                  name="firstName"
                  onChange={handleChange}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label>
                  <div className="mt-3" style={{ width: "500px" }}>
                    <PhoneInput
                      className=""
                      country={"in"}
                      value={phoneNumber}
                      onChange={handleChange1}
                      inputProps={{
                        required: true,
                      }}
                    />
                  </div>
                </label>
                {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
              </div>
              <div className="wrap-input100 validate-input mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="wrap-input100 validate-input mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="input100"
                />
                <span className="focus-input100"></span>
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="continueBtn">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
