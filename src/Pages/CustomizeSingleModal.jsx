import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Accordion from "./Accordian";
import defaultImg from "../images/default.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CustomizeModal({
  handleCloseSidebar,
  data2,
  handleItenaryData,
  itenary,
  trip_style,
}) {
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [days, setDays] = useState("");
  const [categories, setCategories] = useState(
    data2 &&
      data2.map((item) => {
        const attractions = item.attractions.slice();
        attractions.sort((a, b) => b.isAttractive - a.isAttractive);
        return {
          ...item,
          attractions: attractions,
        };
      })
  );
  const [updatedData, setUpdatedData] = useState([]);

  const baseCountryUrl = "https://argosmob.uk/snaptrip/admin/uploads/country/";
  const baseCityUrl = "https://argosmob.uk/snaptrip/admin/uploads/city/";
  const baseAbstractionUrl =
    "https://argosmob.uk/snaptrip/admin/uploads/attraction/";

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const placeholderText =
    trip_style === "Relaxed" ? "Add 2 days or more" : "Add up to 2 days";

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceCategoryId = source.droppableId;
    const destinationCategoryId = destination.droppableId;

    const sourceCategory = updatedData.find(
      (cat) => cat.id === sourceCategoryId
    );
    const destinationCategory = updatedData.find(
      (cat) => cat.id === destinationCategoryId
    );

    const draggedAttraction = sourceCategory.attractions.find(
      (att) => att.attraction_title === draggableId
    );

    const updatedSourceAttractions = sourceCategory.attractions.filter(
      (att) => att.attraction_title !== draggableId
    );

    if (sourceCategoryId === destinationCategoryId) {
      const startIndex = source.index;
      const endIndex = destination.index;

      // Remove the dragged attraction from the source attractions list
      const updatedSourceAttractions = Array.from(sourceCategory.attractions);
      const [removedAttraction] = updatedSourceAttractions.splice(
        startIndex,
        1
      );

      // Insert the dragged attraction at the destination index
      updatedSourceAttractions.splice(endIndex, 0, removedAttraction);
      const updatedDestinationAttractions = [
        ...destinationCategory.attractions,
        draggedAttraction,
      ];

      const updatedCategories = updatedData.map((cat) => {
        if (cat.id === sourceCategoryId) {
          return { ...cat, attractions: updatedSourceAttractions };
        } else if (cat.id === destinationCategoryId) {
          return { ...cat, attractions: updatedDestinationAttractions };
        } else {
          return cat;
        }
      });

      setUpdatedData(updatedCategories);
    } else {
      const updatedDestinationAttractions = [
        ...destinationCategory.attractions,
        draggedAttraction,
      ];

      const updatedCategories = updatedData.map((cat) => {
        if (cat.id === sourceCategoryId) {
          return { ...cat, attractions: updatedSourceAttractions };
        } else if (cat.id === destinationCategoryId) {
          return { ...cat, attractions: updatedDestinationAttractions };
        } else {
          return cat;
        }
      });

      setUpdatedData(updatedCategories);

      if (
        updatedCategories.some((cat) => cat.id === sourceCategoryId) &&
        updatedSourceAttractions.length === 0
      ) {
        const newAttraction = {
          attraction_title: "No Attraction Found For This Day",
        };

        updatedCategories.forEach((cat, index) => {
          if (cat.id === sourceCategoryId) {
            const updatedSource = [...cat.attractions, newAttraction];
            updatedCategories[index].attractions = updatedSource;
          }
        });
        setUpdatedData(updatedCategories);
      }

      const newAttractionIndex = updatedDestinationAttractions.findIndex(
        (att) => att.attraction_title === "No Attraction Found For This Day"
      );

      if (newAttractionIndex !== -1) {
        updatedDestinationAttractions.splice(newAttractionIndex, 1);
        const updatedCategories = updatedData.map((cat, ind) => {
          if (cat.id === sourceCategoryId) {
            return { ...cat, attractions: updatedSourceAttractions };
          } else if (cat.id === destinationCategoryId) {
            return { ...cat, attractions: updatedDestinationAttractions };
          } else {
            return cat;
          }
        });

        if (
          updatedCategories.some((cat) => cat.id === sourceCategoryId) &&
          updatedSourceAttractions.length === 0
        ) {
          const newAttraction = {
            attraction_title: "No Attraction Found For This Day",
          };

          updatedCategories.forEach((cat, index) => {
            if (cat.id === sourceCategoryId) {
              const updatedSource = [...cat.attractions, newAttraction];
              updatedCategories[index].attractions = updatedSource;
            }
          });
        }
        setUpdatedData(updatedCategories);
      }
    }
  };
  const handleChange = (e) => {
    setDays(e.target.value);
    if (e.target.value !== "") {
      setDays(e.target.value);
      const result = [];
      const maxAttractionsPerDay = 5;
      categories.forEach((category, index) => {
        const attractions = category.attractions;
        const totalDays =
          attractions.length > 0
            ? Math.ceil(e.target.value)
            : Math.ceil(e.target.value);

        for (let day = 1; day <= Math.min(totalDays, e.target.value); day++) {
          const startIdx = (day - 1) * maxAttractionsPerDay;
          const endIdx = startIdx + maxAttractionsPerDay;
          const dayAttractions = attractions.slice(startIdx, endIdx);

          result.push({
            country_id: category?.country_id,
            city_name: category?.city_name,
            id: `${day - 1}6`,
            ind: day - 1,
            day: `${day} Day`,
            description: category?.description,
            image: category?.image,
            attractions:
              dayAttractions.length > 0
                ? dayAttractions
                : [{ attraction_title: "No Attraction Found For This Day" }],
            idd: category?.id,
            latitude: category?.latitude,
            longitude: category?.longitude,
          });
        }

        if (e.target.value * maxAttractionsPerDay < attractions.length) {
          const remainingAttractions = attractions.slice(
            e.target.value * maxAttractionsPerDay
          );
          result.push({
            country_id: category?.country_id,
            city_name: category?.city_name,
            id: `10`,
            ind: 10,
            day: "Others",
            description: category?.description,
            image: category?.image,
            attractions: remainingAttractions,
            idd: category?.id,
            latitude: category?.latitude,
            longitude: category?.longitude,
          });
        }
      });
      setUpdatedData(result);
    }
  };

  const handleSubmit = () => {
    if (days !== "" && days > 0) {
      const result = updatedData.map((ele) => {
        const filteredData = ele.attractions.filter((element) => {
          return (
            element?.attraction_title !== "No Attraction Found For This Day"
          );
        });
        return { ...ele, attractions: filteredData };
      });

      handleItenaryData(categories, days, result);
    }
  };

  const toggleAccordion = (index, parentId) => {
    setActiveSectionId(activeSectionId === index ? null : index);
    setActiveId(parentId);
  };

  useEffect(() => {
    setCategories(data2);
    setDays("");
  }, [data2]);

  console.log("categories", categories);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main>
        <div className="d-flex justify-content-between align-items-center fixed_Div">
          <div></div>
          <div onClick={handleCloseSidebar} style={{ cursor: "pointer" }}>
            <RxCross2 size={25} style={{ color: "black" }} />
          </div>
        </div>
        {categories.map((category, categoryIndex) => {
          return (
            <React.Fragment key={category.id}>
              <h3
                style={{ color: "#006b7e" }}
                className="mb-3 text-center pt-5"
              >
                {category.city_name}
              </h3>
              <div className="col-md-12">
                <Slider {...settings}>
                  {category?.images.map((element) => {
                    return (
                      <img
                        src={`${baseCityUrl}${element}`}
                        className="mb-3"
                        width="100%"
                        height="250px"
                      />
                    );
                  })}
                </Slider>
                <p style={{ textAlign: "justify" }}>
                  <span style={{ color: "#161616" }}>{category?.title}</span>
                </p>
                <p style={{ textAlign: "justify" }}>
                  <span style={{ color: "#161616" }}>
                    {category?.description}
                  </span>
                </p>
              </div>
              {!itenary && (
                <div className="d-flex justify-content-center mb-3 mt-3">
                  <div className="d-flex justify-content-evenly align-items-center addDaysDiv">
                    <input
                      type="number"
                      min="0"
                      placeholder={placeholderText}
                      value={days}
                      onChange={handleChange}
                    />
                    <div>
                      <button onClick={handleSubmit} className="AddBtn ms-3">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-12 my-2">
                <div className="fontDiv" style={{ color: "#161616" }}>
                  <div className="flexx">
                    <p style={{ color: "#006b7e" }}>Sites</p>
                  </div>
                  {!days &&
                    category?.attractions?.map((element, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Accordion
                            title={element?.attraction_title}
                            content={
                              <div>
                                <>
                                  <p>{element?.attraction_description}</p>
                                  <a
                                    href={element.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                  {element?.link}
                                  </a>
                                </>
                              </div>
                            }
                            isActive={
                              activeSectionId === index &&
                              activeId === category.id
                            }
                            onClick={() => toggleAccordion(index, category.id)}
                            images={element?.type}
                          />
                        </React.Fragment>
                      );
                    })}
                </div>
              </div>
              <hr className="my-4" style={{ color: "black" }} />
            </React.Fragment>
          );
        })}
        {days &&
          updatedData.map((category, cateIndex) => (
            <React.Fragment key={category.id}>
              <span className="secondary_color">{category.day}</span>
              <div className="secondary_color">
                <Droppable droppableId={category.id} type="droppable-item">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {category?.attractions?.map((element, index) => (
                        <Draggable
                          key={element.attraction_title}
                          draggableId={element.attraction_title}
                          index={index}
                          isDragDisabled={
                            element.attraction_title ===
                            "No Attraction Found For This Day"
                          }
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Accordion
                                title={element?.attraction_title}
                                content={
                                  <div>
                                    {element?.attraction_title !==
                                    "No Attraction Found For This Day" ? (
                                      <>
                                        <p>{element?.attraction_description}</p>
                                        <a
                                          href={element.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {element.link}
                                        </a>
                                      </>
                                    ) : (
                                      <p>No Attraction Found For This Day</p>
                                    )}
                                  </div>
                                }
                                isActive={
                                  activeSectionId === index &&
                                  activeId === category.id
                                }
                                onClick={() =>
                                  element?.attraction_title !==
                                    "No Attraction Found For This Day" &&
                                  toggleAccordion(index, category.id)
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <hr style={{ color: "black" }}></hr>
            </React.Fragment>
          ))}
      </main>
    </DragDropContext>
  );
}

export default CustomizeModal;
