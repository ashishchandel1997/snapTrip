// import React from "react";
// import { BiSolidRightArrowCircle } from "react-icons/bi";

// const Accordion = ({ picture, content, title, isActive, onClick }) => {
//   return (
//     <div className="accordion-item">
//       <div
//         className="accordion-title"
//         style={{
//           backgroundColor: isActive && "#fbba18",
//           color: isActive && "#fff",
//         }}
//         onClick={onClick}
//       >
//         <div className="d-flex align-items-center">
//           <span className="pe-2">
//             <BiSolidRightArrowCircle />
//           </span>
//           {title}{" "}
//         </div>
//         <div>{isActive ? "-" : "+"}</div>
//       </div>
//       {isActive && (
//         <div className="accordion-content">
//           <div className="row">
//             <div className="col-md-6">
//               <div style={{ height: "100%", width: "100%" }}>
//                 <img
//                   src={picture}
//                   style={{ objectFit: "cover", height: "100%" }}
//                 />
//               </div>
//             </div>
//             <div
//               className="col-md-6"
//               style={{ fontSize: "14px", textAlign: "justify" }}
//             >
//               {content}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Accordion;

import React from "react";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import nature from "../images/Icon_7.png"
import culture from "../images/Icon_8.png"

const Accordion = ({
  title,
  titleImage,
  content,
  isActive,
  onClick,
  images,
}) => {
  return (
    <div className="accordion-item">
      <div
        className="accordion-title"
        style={{
          backgroundColor: isActive && "#fbba18",
          color: isActive && "#fff",
        }}
        onClick={onClick}
      >
        <div className="d-flex align-items-center">
          {titleImage && (
            <img
              src={titleImage}
              alt="Title Image"
              style={{
                objectFit: "cover",
                height: "24px",
                width: "24px",
                marginRight: "8px",
              }}
            />
          )}
          <span className="">
            {/* <BiSolidRightArrowCircle /> */}
            <RiArrowDropDownLine size={25} />
          </span>
          {title}
        </div>
        <div>{images==="natural" ? <img
              src={nature}
              alt="Title Image"
              style={{
                objectFit: "cover",
                height: "40px",
                width: "40px",
              }}
            /> : <img
            src={culture}
            alt="Title Image"
            style={{
              objectFit: "cover",
              height: "40px",
              width: "40px",
            }}
          />}</div>
        {/* <div></div> */}
      </div>
      {isActive && (
        <div className="accordion-content">
          <div className="row">
            <div
              className="col-md-12"
              style={{ fontSize: "14px", textAlign: "justify" }}
            >
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
