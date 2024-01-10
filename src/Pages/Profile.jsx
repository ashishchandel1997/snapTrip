import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import defaultImg from "../images/default.png";

const Profile = ({ user, setUser }) => {
  const [first_name, setFirst_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  const baseUrl = "https://argosmob.uk/snaptrip/admin/img/avatars/";

  const handleChange1 = (value) => {
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleTogglePassword = () => {
    setToggle(!toggle);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handlenewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleProfile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileData = () => {
    const formData = {
      userid: user,
      profile: file,
    };
    axios
      .post(
        "https://www.argosmob.uk/snaptrip/snaptrip_update_profile.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          alert(res?.data?.message);
          setFile("");
          getData();
        } else {
          alert(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userid: user,
      name: first_name,
      email: email,
      username: username,
      bio: "",
      dob: "",
      gender: "",
      phone: phoneNumber,
    };
    axios
      .post(
        "https://www.argosmob.uk/snaptrip/snaptrip_update_user_data.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          alert(res?.data?.message);
          getData();
        } else {
          alert(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const formData = {
        userid: user,
        old_password: password,
        new_password: newPassword,
      };
      axios
        .post(
          "https://www.argosmob.uk/snaptrip/snaptrip_change_password.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            alert(res?.data?.message);
            setPassword("");
            setConfirmPassword("");
            setNewPassword("");
            setToggle(false);
          } else {
            alert(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("password and confirm password are not matching");
    }
  };

  const getData = () => {
    if (user) {
      const formData = {
        userid: user,
      };
      axios
        .post(
          "https://www.argosmob.uk/snaptrip/snaptrip_get_user_details.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            setFirst_name(res?.data?.User_status?.first_name);
            setUsername(res?.data?.User_status?.username);
            setPhoneNumber(res?.data?.User_status?.phone);
            setEmail(res?.data?.User_status?.email);
            setImg(res?.data?.User_status?.profile);
            sessionStorage.setItem("pro", res?.data?.User_status?.profile);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <NavBar user={user} setUser={setUser} />
      </div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div
            className="wrap-login100"
            style={{ padding: "20px 110px 33px 110px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div style={{ width: "40%" }}>
                <img
                  src={img == "" ? defaultImg : `${baseUrl}${img}`}
                  className="edit_profile_image"
                />
              </div>
              <div style={{ width: "60%" }}>
                <input type="file" onChange={handleProfile} />

                {file && (
                  <button className="upDate" onClick={handleProfileData}>
                    upload
                  </button>
                )}
              </div>
            </div>
            <div className="d-flex w-100 justify-content-between">
              <h4>Manage Account Details</h4>
              <p className="upDate" onClick={handleTogglePassword}>
                Update Password
              </p>
            </div>

            {toggle && (
              <form
                onSubmit={handlePasswordSubmit}
                className="login100-form validate-form d-flex justify-content-between flex-wrap"
              >
                <div style={{ padding: "31px 0px 4px 0px" }}>
                  <span className="txt1">Current Password</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="pass"
                    value={password}
                    onChange={handlePassword}
                  />
                  <span className="focus-input100"></span>
                </div>
                <div style={{ padding: "31px 0px 4px 0px" }}>
                  <span className="txt1"> Confirm Password</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="pass"
                    value={confirmPassword}
                    onChange={handleconfirmPassword}
                  />
                  <span className="focus-input100"></span>
                </div>
                <div style={{ padding: "31px 0px 4px 0px" }}>
                  <span className="txt1">Confirm New Password</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="password"
                    name="pass"
                    value={newPassword}
                    onChange={handlenewPassword}
                  />
                  <span className="focus-input100"></span>
                </div>
                <div
                  className="container-login100-form-btn"
                  style={{ marginTop: "17px" }}
                >
                  <input
                    className="login100-form-btn my-4"
                    type="submit"
                    value="Save New Password"
                  />
                </div>
              </form>
            )}
            <form
              onSubmit={handleSubmit}
              className="login100-form validate-form d-flex justify-content-between flex-wrap"
            >
              <div style={{ padding: "20px 0px 4px 0px" }}>
                <span className="txt1">Name</span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
                <span className="focus-input100"></span>
              </div>

              <div style={{ padding: "31px 0px 4px 0px" }}>
                <span className="txt1">Email</span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="email"
                  name="email"
                  disabled={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input100"></span>
              </div>
              <div style={{ padding: "31px 0px 4px 0px" }}>
                <span className="txt1">User Name</span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="focus-input100"></span>
              </div>
              <div>
                <div style={{ padding: "31px 0px 0px 0px" }}>
                  <span className="txt1">Phone </span>
                </div>
                <label>
                  <div className="mt-1" style={{ width: "462px" }}>
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
              </div>
              <div
                className="d-flex align-items-center"
                style={{ height: "100px" }}
              >
                <div className="txt1">Subscribe NewsLetter:</div>
                <div id="app-cover">
                  <div className="toggle-button-cover">
                    <div className="button-cover">
                      <div className="button r" id="button-1">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input
                className="login100-form-btn mb-5"
                type="submit"
                value="Save"
              />
            </form>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Profile;
