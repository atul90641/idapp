import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import template from "/template.png"; // ensure this image is inside /public

const Overlay = () => {
  const [image, setImage] = useState(null);
  const containerRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDownload = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current, {
      backgroundColor: null,
      scale: 2,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "overlay_output.png";
    link.click();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <button className="btn" onClick={handleDownload}>Download</button>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: 1024,
          height: 1126,
          marginTop: "20px",
        }}
      >
        <img
          src={template}
          alt="Template"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            style={{
              position: "absolute",
              top: "355px", // customize this
              left: "166px", // customize this
              width: "687px", // customize size
              height: "431px",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Overlay;
