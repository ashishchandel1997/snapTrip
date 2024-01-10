import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import NavBar from "../../NavBar";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const Login = ({ setUser, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otpField, setOptField] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [otpData, setOtpData] = useState("");
  const [toggle, setToggle] = useState(false);
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const clientID =
    "778625589966-h1vkntngfrasd93jss7uc57fncdh1dlf.apps.googleusercontent.com";

  const handleClose = () => {
    setToggle(false);
    setOptField(false);
    setNewPasswordToggle(false);
    setOTP(["", "", "", ""]);
    setOtpData("");
    setNewPassword("");
    setUserId("");
    setEmail("");
    setIsLoading(false);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let validationErrors = {};

    if (username.trim() === "") {
      validationErrors.username = "username is required";
    }
    if (password === "") {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleForgot = () => {
    setToggle(!toggle);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    let formData;
    if (credentialResponse?.name) {
      formData = {
        email: credentialResponse?.email,
        name: credentialResponse?.name,
      };
    } else {
      const details = jwt_decode(credentialResponse.credential);
      formData = {
        email: details?.email,
        name: details?.name,
      };
    }

    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip//snaptrip_login_by_social_media.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        setUser(response?.data?.User_status?.id);
        sessionStorage.setItem("pro", response?.data?.User_status?.profile);
        navigate("/");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google Login Failed");
  };

  const handleEmailApi = async () => {
    var validateEmail = true;
    if (email.trim() === "") {
      alert("Email is required");
      validateEmail = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      alert("Invalid email format");
      validateEmail = false;
    }

    if (validateEmail) {
      setIsLoading(true);
      const formData = {
        email: email,
      };

      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_forget_password.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response?.data?.success) {
          alert(response?.data?.message);
          setOtpData(response?.data?.User_status?.otp);
          setUserId(response?.data?.User_status?.id);
          setOptField(true);
        } else {
          alert("please check your email");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        username: username,
        password: password,
      };
      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_login_users.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.data?.success) {
          alert(response?.data?.message);
          setUser(response?.data?.User_status?.id);
          setUsername("");
          setPassword("");
          navigate("/");
          sessionStorage.setItem("pro", response?.data?.User_status?.profile);
        } else {
          alert(response?.data?.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Form is not valid. Please check the errors.");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow entering only single digits
    if (/^[0-9]$/.test(value)) {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);

      // Focus on the next input field if available
      if (index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else if (
      value === "" &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      // Handle Backspace key: Clear the input field and focus on the previous input
      const updatedOTP = [...otp];
      updatedOTP[index] = "";
      setOTP(updatedOTP);
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleOTPApi = () => {
    const formattedOTP = otp.join("");

    if (otpData == formattedOTP) {
      setNewPasswordToggle(true);
    } else {
      alert("Please Enter a Valid OTP");
    }
  };

  const handleNewPassword = async () => {
    const formData = {
      userid: userId,
      password: newPassword,
    };

    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_update_password.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        alert(response?.data?.message);
        handleClose();
        setOTP(["", "", "", ""]);
        setOtpData("");
        setNewPassword("");
        setUserId("");

        sessionStorage.setItem("pro", response?.data?.User_status?.profile);
      } else {
        setOTP(["", "", "", ""]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div
            className="wrap-login100"
            style={{ padding: "62px 110px 33px 110px" }}
          >
            <form
              className="login100-form validate-form d-flex justify-content-between align-items-center flex-wrap"
              onSubmit={handleSubmit}
            >
              <span
                className="login100-form-title"
                style={{ paddingBottom: "53px" }}
              >
                Sign In With
              </span>
              <GoogleOAuthProvider clientId={clientID}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                />
              </GoogleOAuthProvider>
              <LoginSocialFacebook
                appId="1666440740488340"
                onResolve={({ provider, data }) => {
                  handleGoogleLoginSuccess(data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <Link className="fb_Button">
                  <FaFacebook />
                  Facebook
                </Link>
              </LoginSocialFacebook>
              <div style={{ padding: "31px 0px 9px 0px" }}>
                <span className="txt1">Username</span>
              </div>
              <div className="wrap-input100 ">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsername}
                />
                <span className="focus-input100"></span>
                {errors.username && (
                  <p className="error text-center">{errors.username}</p>
                )}
              </div>
              <div style={{ padding: "31px 0px 9px 0px" }}>
                <span className="txt1">Password</span>
                <Link to="" className="txt2 bo1" style={{ marginLeft: "10px" }}>
                  <span onClick={handleForgot} style={{ color: "#ffa500" }}>
                    Forgot?
                  </span>
                </Link>
              </div>
              <div className="wrap-input100">
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  value={password}
                  onChange={handlePassword}
                />
                <span className="focus-input100"></span>
                {errors.password && (
                  <p className="text-center">{errors.password}</p>
                )}
              </div>
              <div
                className="container-login100-form-btn"
                style={{ marginTop: "17px" }}
              >
                <button className="login100-form-btn" type="submit">
                  Sign In
                </button>
              </div>
              <div
                className="w-100 text-center "
                style={{ paddingTop: "55px" }}
              >
                <span className="txt2">Not a member?</span>
                <Link to="/register" className="txt2 bo1">
                  <span style={{ color: "#ffa500", marginLeft: "10px" }}>
                    Sign up now
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="smallModal">
          <Modal show={toggle} onHide={handleClose}>
            <Modal.Body>
              {newPasswordToggle ? (
                <>
                  <h5 className="text-center my-3" style={{ color: "#ffa500" }}>
                    Enter New Password.
                  </h5>
                  <div className="px-5">
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <button className="AddBtn" onClick={handleNewPassword}>
                      Submit
                    </button>
                  </div>
                </>
              ) : otpField ? (
                <div>
                  <h5
                    className="text-center my-3 mt-5"
                    style={{ color: "#ffa500" }}
                  >
                    Enter OTP.
                  </h5>
                  <div className="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        className="otp-input"
                      />
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <button className="AddBtn" onClick={handleOTPApi}>
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h5 className="text-center my-3" style={{ color: "#ffa500" }}>
                    Please Enter Email.
                  </h5>
                  <div className="px-5">
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <button
                      className="AddBtn"
                      disabled={isLoading}
                      onClick={handleEmailApi}
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Login;
