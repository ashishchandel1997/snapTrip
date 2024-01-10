import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Accordion from "./Accordian";
import defaultImg from "../images/default.png";

function CustomizeMultipleModal({ handleCloseSidebar, citiesData }) {
  const [data, setData] = useState(citiesData);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const baseCountryUrl = "https://argosmob.uk/snaptrip/admin/uploads/country/";
  const baseCityUrl = "https://argosmob.uk/snaptrip/admin/uploads/city/";
  const baseAbstractionUrl =
    "https://argosmob.uk/snaptrip/admin/uploads/attraction/";

  const toggleAccordion = (index, parentId) => {
    setActiveSectionId(activeSectionId === index ? null : index);
    setActiveId(parentId);
  };

  useEffect(() => {
    setData(citiesData);
  }, [citiesData]);

  return (
    <main>
      <div className="d-flex justify-content-between align-items-center fixed_Div">
        <div></div>
        <div
          onClick={handleCloseSidebar}
          style={{ cursor: "pointer", color: "black" }}
        >
          <RxCross2 size={25} />
        </div>
      </div>
      <div className="pt-5">
        {data?.map((ele) => {
          return (
            <React.Fragment key={ele.id}>
              <h3 className="mb-3 pt-4" style={{ color: "#006b7e" }}>
                {`Day ${ele?.days}`}
              </h3>
              <div className="col-md-12">
                <img
                  src={
                    `${ele?.image}` ? `${baseCityUrl}${ele?.image}` : defaultImg
                  }
                  className="mb-3"
                  width="100%"
                  height="250px"
                />
                <p style={{ textAlign: "justify" }}>
                  <span
                    style={{
                      color: "#006b7e",
                      fontSize: "20px",
                      paddingRight: "8px",
                    }}
                  ></span>
                  {ele?.title}
                </p>
                <p style={{ textAlign: "justify", color: "#161616" }}>
                  <span
                    style={{
                      fontSize: "20px",
                      paddingRight: "8px",
                    }}
                  ></span>
                  {ele?.description}
                </p>
              </div>
              <div className="col-md-12 my-2">
                <div className="fontDiv" style={{ color: "#161616" }}>
                  <p style={{ color: "#006b7e" }}>Sites</p>
                  <hr />
                  {ele?.attractions?.map((element, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Accordion
                          title={element?.attraction_title}
                          content={
                            <div>
                              <>
                                <p>{element?.attraction_description}</p>
                                <a
                                  href="your_link_here"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Your Link Text
                                </a>
                              </>
                            </div>
                          }
                          picture={
                            `${element?.attraction_image}`
                              ? `${baseAbstractionUrl}${element?.attraction_image}`
                              : defaultImg
                          }
                          isActive={
                            activeSectionId === index && activeId === ele.id
                          }
                          onClick={() => toggleAccordion(index, ele.id)}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default CustomizeMultipleModal;
