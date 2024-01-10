import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import down_load from "../images/download.png";
import Snackbar from "../components/AuthComponent/Snackbar";
import defaultImg from "../images/default.png";
import axios from "axios";
import favourite_icon from "../images/favourite.png";
import Accordion from "./Accordian";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowDropDownLine } from "react-icons/ri";

function CustomizeAllModal({ handleCloseSidebar, allData, user }) {
  const [data, setData] = useState(allData);
  const [toggle, setToggle] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [activeSectionId, setActiveSectionId] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [toggle2,setToggle2]=useState(false)
  const [toggle3,setToggle3]=useState(false)
  const [toggle4,setToggle4]=useState(false)

  const baseCountryUrl = "https://argosmob.uk/snaptrip/admin/uploads/country/";
  const baseCityUrl = "https://argosmob.uk/snaptrip/admin/uploads/city/";
  const baseAbstractionUrl =
    "https://argosmob.uk/snaptrip/admin/uploads/attraction/";
  const bucket_url = "https://argosmob.uk/snaptrip/admin/uploads/buckets/";

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleWishlist = async () => {
    if (user) {
      const formData = {
        countryid: data?.id,
        userid: user,
      };

      try {
        const response = await axios.post(
          "https://www.argosmob.uk/snaptrip/snaptrip_add_in_wishlist.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setDisplayText(response?.data?.message);
        setToggle(true);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setToggle(true);
      setDisplayText("Please Login");
    }
  };

  const toggleAccordion = (index, parentId) => {
    setActiveSectionId(!activeSectionId);
    setActiveId(1);
    setToggle2(false);
    setToggle3(false);
    setToggle4(false);
  };

  const toggleAccordion2 = (index, parentId) => {
    setToggle2(!toggle2);
    setActiveId(2);
    setToggle3(false);
    setToggle4(false);
    setActiveSectionId(false);
  };

  const toggleAccordion3 = (index, parentId) => {
    setToggle3(!toggle3);
    setActiveId(3);
    setToggle2(false);
    setToggle4(false);
    setActiveSectionId(false);
  };

  const toggleAccordion4 = (index, parentId) => {
    setToggle4(!toggle4);
    setActiveId(4);
    setToggle2(false);
    setToggle3(false);
    setActiveSectionId(false);
  };

  const handlePdf = async () => {
    const formData = new FormData();
    formData.append("countryid", data?.id);
    try {
      const response = await axios.post(
        "https://argosmob.uk/snaptrip/snaptrip_generate_pdf.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDisplayText(response?.data?.message);
      setToggle(true);
      const pdfUrl = `https://argosmob.uk/snaptrip/admin/uploads/generatepdf/${response?.data?.User_status?.pdf}`;

      // Open a new tab with the PDF URL
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setData(allData);
  }, [allData]);

  console.log("data", allData);
  console.log("active ", activeId);

  return (
    <main>
      <div className="d-flex justify-content-between align-items-center fixed_Div">
        <div className="">
          <img
            src={down_load}
            style={{ cursor: "pointer" }}
            className="download_icon"
            onClick={handlePdf}
          />
          <img
            src={favourite_icon}
            style={{ cursor: "pointer" }}
            className="favourite_icon"
            onClick={handleWishlist}
          />
        </div>
        <div onClick={handleCloseSidebar} style={{ cursor: "pointer" }}>
          <RxCross2 size={25} style={{ color: "black" }} />
        </div>
      </div>
      <h3 className="pt-5" style={{ color: "#006b7e", textAlign: "center" }}>
        {data?.country_name}
      </h3>
      <div>
        <img
          src={
            `${data?.image}` ? `${baseCountryUrl}${data?.image}` : defaultImg
          }
          className="my-4"
          style={{ height: "300px", width: "100%" }}
        />
      </div>
      <p className="my-4" style={{ textAlign: "justify", color: "#161616" }}>
        {data?.description}
      </p>
      <div className="">
        <h2 className="text-center my-4" style={{ color: "#006b7e" }}>
        Brief Country Overview
        </h2>

        <div
          onClick={toggleAccordion4 }
          className="accordion-title"
          style={{
            backgroundColor: activeId === 4 && "#fbba18",
            color: activeId === 4 && "#fff",
          }}
        >
          <div className="d-flex align-items-center">
            <span >
             <RiArrowDropDownLine size={25} />
            </span>
            Must Do Bucket-List
          </div>
          {/* <div>{activeId === 4 ? "-" : "+"}</div> */}         
        </div>
        {activeId === 4 && toggle4 && (
          <div>
            <Slider {...settings}>
              {data?.popular_buckets?.length > 0 &&
                data?.popular_buckets.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-md-12">
                        <img
                          src={
                            `${ele?.bucket_list_img}`
                              ? `${bucket_url}${ele?.bucket_list_img}`
                              : defaultImg
                          }
                          className="mb-3"
                          width="100%"
                          height="250px"
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
            </Slider>
            {data?.popular_buckets?.length > 0 &&
              data?.popular_buckets.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="col-md-12 ps-2 py-2"  style={{ color: "#006b7e" }}>
                      {ele?.bucket_title}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        )}

        <div
          onClick={toggleAccordion}
          className="accordion-title"
          style={{
            backgroundColor: activeId === 1 && "#fbba18",
            color: activeId === 1 && "#fff",
          }}
        >
          <div className="d-flex align-items-center">
            <span >
             <RiArrowDropDownLine size={25} />
            </span>
            Must Try Foods
          </div>
          {/* <div>{activeId === 1 ? "-" : "+"}</div> */}
        </div>
        {activeId === 1 && activeSectionId && (
          <div>
            <Slider {...settings}>
              {data?.popular_food?.length > 0 &&
                data?.popular_food.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-md-12">
                        <img
                          src={
                            `${ele?.try_food_img}`
                              ? `${bucket_url}${ele?.try_food_img}`
                              : defaultImg
                          }
                          className="mb-3"
                          width="100%"
                          height="250px"
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
            </Slider>
            {data?.popular_food?.length > 0 &&
              data?.popular_food.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="col-md-12 ps-2 py-2"  style={{ color: "#006b7e" }}>
                      {ele?.try_food}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        )}

        <div
          onClick={toggleAccordion2}
          className="accordion-title"
          style={{
            backgroundColor: activeId === 2 && "#fbba18",
            color: activeId === 2 && "#fff",
          }}
        >
          <div className="d-flex align-items-center">
            <span >
             <RiArrowDropDownLine size={25} />
            </span>
            Common Phrases in Local Language
          </div>
          {/* <div>{activeId === 2 ? "-" : "+"}</div> */}
        </div>
        {activeId === 2 && toggle2 && (
          <div>
            <Slider {...settings}>
              {data?.popular_language?.length > 0 &&
                data?.popular_language.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-md-12">
                        <img
                          src={
                            `${ele?.bucket_lang_img}`
                              ? `${bucket_url}${ele?.bucket_lang_img}`
                              : defaultImg
                          }
                          className="mb-3"
                          width="100%"
                          height="250px"
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
            </Slider>
            {data?.popular_language?.length > 0 &&
              data?.popular_language.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className="col-md-12 ps-2 py-2"
                      style={{ color: "#006b7e" }}
                    >
                      {ele?.bucket_lang}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        )}

        <div
          onClick={toggleAccordion3}
          className="accordion-title"
          style={{
            backgroundColor: activeId === 3 && "#fbba18",
            color: activeId === 3 && "#fff",
          }}
        >
          <div className="d-flex align-items-center">
            <span >
             <RiArrowDropDownLine size={25} />
            </span>
            Local Transportation Options
          </div>
          {/* <div>{activeId === 3 ? "-" : "+"}</div> */}
        </div>
        {activeId === 3 && toggle3 && (
          <div>
            <Slider {...settings}>
              {data?.popular_transport?.length > 0 &&
                data?.popular_transport.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="col-md-12">
                        <img
                          src={
                            `${ele?.transport_img}`
                              ? `${bucket_url}${ele?.transport_img}`
                              : defaultImg
                          }
                          className="mb-3"
                          width="100%"
                          height="250px"
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
            </Slider>
            {data?.popular_transport?.length > 0 &&
              data?.popular_transport.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className="col-md-12 ps-2 py-2"
                      style={{ color: "#006b7e" }}
                    >
                      {ele?.transport}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        )}
      </div>
      {toggle && <Snackbar setToggle={setToggle} displayText={displayText} />}
    </main>
  );
}

export default CustomizeAllModal;
