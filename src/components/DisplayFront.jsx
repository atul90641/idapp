import React from "react";
import "../App.css";

const DisplayFront = ({ formData, onClick, cardRef }) => {
    const imageSrc = formData.image;
  return (
    <div className="card-container" ref={cardRef} onClick={onClick}>
      <div className="rotated-div">Issue Date : {formData.issueDate}</div>
      <div className="box">
        <img src={imageSrc} alt="My Image" />
      </div>
      <div className="text font1">{formData.hindiName}</div>
      <div className="text font2">{formData.name}</div>
      <div className="text font3">जन्म तिथि / DOB: {formData.dob}</div>
      <div className="text font4">
        {formData.gender === "Male" ? "पुरुष / MALE" : "महिला / FEMALE"}
      </div>
      <div className="text font5">{formData.aadhaar}</div>
      <div className="text font6">VID : {formData.vid}</div>
    </div>
    
  );
};

export default DisplayFront;
