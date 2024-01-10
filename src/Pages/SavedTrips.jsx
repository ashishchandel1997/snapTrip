import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/default.png";

const SavedTrips = ({ user ,setUser}) => {
  const [savedTrip, setSavedTrip] = useState([]);
  const navigate = useNavigate();

  const baseCountryUrl = "https://argosmob.uk/snaptrip/admin/uploads/country/";

  const handleSavedTrips = async () => {
    const formData = {
      userid: user,
    };
    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_my_save_trips.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        setSavedTrip(response?.data?.User_status);
      }else{
        setSavedTrip([])
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTrip = async (id) => {
    const formData = {
      id: id,
    };
    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/sanptrip_get_details_of_save_trip.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        navigate("/trip", { state: response?.data?.User_status });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const userResponse = window.confirm("Are You Sure?");

    if (userResponse) {
      const formData = {
        id: id,
      };
      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_delete_my_save_trip.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        handleSavedTrips();

      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      handleSavedTrips();
    }
  }, []);
  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <div className="container" style={{ marginTop: "50px" }}>
        <h2 style={{ color: "#fbba18" }} className="text-center mb-5">
          Your Trips
        </h2>
        {savedTrip.length > 0 ? (
          <div className="d-flex justify-content-start align-items-start flex-wrap ps-5">
            {savedTrip?.map((ele) => {
              return (
                <div className="d-flex flex-column m-3">
                <div
                  className="card "
                  style={{ width: "18rem" }}
                  onClick={() => handleTrip(ele?.id)}
                >
                  <img
                    classclassName="card-img-top"
                    style={{ height: "220px" }}
                    src={
                      `${ele?.country_image}`
                        ? `${baseCountryUrl}${ele?.country_image}`
                        : defaultImg
                    }
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ele?.country_name}</h5>
                    <p className="card-text">
                      {ele?.country_description?.slice(0, 100)}
                    </p>
                  </div>
               
                </div>
                <div
                    className="readBtn text-center"
                    onClick={() => handleDelete(ele?.id)}
                  >
                    Delete
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center mb-5">No Saved Trips</p>
        )}
      </div>
    </>
  );
};

export default SavedTrips;
