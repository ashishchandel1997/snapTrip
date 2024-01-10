import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";

const Wishlist = ({ user, setUser }) => {
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  const baseCountryUrl = "https://argosmob.uk/snaptrip/admin/uploads/country/";

  const handleWishlistNavigate = () => {
    navigate("/filteredcountry");
    sessionStorage.setItem("countryID", wishlist[0]?.country_id);
  };
  const handleWishlist = async () => {
    const formData = {
      userid: user,
    };
    try {
      const response = await axios.post(
        "https://www.argosmob.uk/snaptrip/snaptrip_get_data_from_wishlist.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        setWishlist(response?.data?.User_status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      handleWishlist();
    }
  }, []);
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="container" style={{ marginTop: "50px" }}>
        <h2 style={{ color: "#fbba18" }} className="text-center mb-5">
          Your Wishlists
        </h2>
        {wishlist.length > 0 ? (
          <div className="d-flex justify-content-start align-items-start flex-wrap ps-5">
            {wishlist?.map((ele) => {
              return (
                <div
                  class="card m-3"
                  style={{ width: "18rem" }}
                  onClick={handleWishlistNavigate}
                >
                  <img
                    class="card-img-top"
                    style={{ height: "220px" }}
                    src={`${baseCountryUrl}${ele?.country_image}`}
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{ele?.country_name}</h5>
                    <p class="card-text">
                      {ele?.country_description?.slice(0, 100)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center mb-5">
            No Data Found Please Add Data to Your Wishlist
          </p>
        )}
      </div>
    </>
  );
};

export default Wishlist;
