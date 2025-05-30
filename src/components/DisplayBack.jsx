import React from "react";
import "../App.css";

const DisplayBack = ({ formData, onClick, cardRef }) => {
    
  return (
    <div className="card-container" ref={cardRef} onClick={onClick}>
      
      <div className="text font7">
        {formData.gender === "Male" ? "S/O" : "D/O"} {formData.hindiFatherName}, {formData.hindiAddress}
      </div>
      
      <div className="text font8">
        {formData.gender === "Male" ? "S/O" : "D/O"} {formData.fatherName}, {formData.address}
      </div>
      <div className="text font9">पता:</div>
      <div className="text font10">Address:</div>
      <div className="text font11">{formData.aadhaar}</div>
      <div className="text font12">VID : {formData.vid}</div>
      <div className="box1">
        <img src="/qr.png" alt="My Image" />
      </div>
    </div>
    
  );
};

export default DisplayBack;
