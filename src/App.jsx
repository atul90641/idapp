import React, { useState, useRef } from "react";
import Form from "./components/Form";
import DisplayFront from "./components/DisplayFront";
import DisplayBack from "./components/DisplayBack";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(null);

  const frontRef = useRef();
  const backRef = useRef();

  const generateOverlayImage = async (ref, templatePath, outputName) => {
    if (!ref.current) return;

    await document.fonts.ready;

    const cardCanvas = await html2canvas(ref.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = 1024;
    finalCanvas.height = 1126;
    const finalCtx = finalCanvas.getContext("2d");

    const templateImage = new Image();
    templateImage.src = templatePath;

    templateImage.onload = () => {
      finalCtx.drawImage(templateImage, 0, 0, 1024, 1126);

      const resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = 687;
      resizedCanvas.height = 431;
      const resizedCtx = resizedCanvas.getContext("2d");
      resizedCtx.drawImage(cardCanvas, 0, 0, 687, 431);

      finalCtx.drawImage(resizedCanvas, 166, 355);

      const finalImage = finalCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = outputName;
      link.click();
    };
  };

  const handleDownloadFront = () => {
    generateOverlayImage(frontRef, "/template-front.png", "aadhar_front.png");
  };

  const handleDownloadBack = () => {
    generateOverlayImage(backRef, "/template-back.png", "aadhar_back.png");
  };

  return (
    <div className="App">
      <Form onSetFormData={setFormData} />
      {formData && (
        <>
          <DisplayFront formData={formData} cardRef={frontRef} />
          <DisplayBack formData={formData} cardRef={backRef} />
        </>
      )}
      {formData && (
  <div style={{ marginTop: "10px" }}>
    <button onClick={handleDownloadFront} className="btn btn-primary" style={{ marginRight: "10px" }}>
      Download Front with Template
    </button>
    <button onClick={handleDownloadBack} className="btn btn-primary">
      Download Back with Template
    </button>
  </div>
)}
    </div>
  );
}

export default App;
