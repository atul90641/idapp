import React, { useState } from "react";

function Form({ onSetFormData }) {
  const [form, setForm] = useState({
    name: "",
    hindiName: "",
    fatherName: "",
    hindiFatherName: "",
    dob: "",
    address: "",
    hindiAddress: "",
    gender: "Male",
    aadhaar: "",
    vid: "",
    image: null,
    issueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhaar") {
      const digits = value.replace(/\D/g, "").slice(0, 12);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      setForm((prev) => ({ ...prev, aadhaar: formatted }));
    } else if (name === "vid") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      setForm((prev) => ({ ...prev, vid: formatted }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomNumber = (length) => {
    let number = "";
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  };

  const generateAadhaar = () => {
    const raw = generateRandomNumber(12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setForm((prev) => ({ ...prev, aadhaar: formatted }));
  };

  const generateVID = () => {
    const raw = generateRandomNumber(16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setForm((prev) => ({ ...prev, vid: formatted }));
  };

  const generateRandomDate = () => {
    const start = new Date("2014-01-01");
    const end = new Date("2015-12-31");
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const day = String(randomDate.getDate()).padStart(2, "0");
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const year = randomDate.getFullYear();
    setForm((prev) => ({ ...prev, issueDate: `${day}/${month}/${year}` }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.dob || !form.aadhaar || !form.vid) {
      alert("Please fill all required fields.");
      return;
    }
    onSetFormData(form);
  };

  const formStyle = {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  return (
  <div style={{ marginBottom: "20px", maxWidth: "800px", margin: "auto" }}>
    {/* Row 1 */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <input type="text" name="name" placeholder="Name (English)" value={form.name} onChange={handleChange} style={inputStyle} />
      <input type="text" name="hindiName" placeholder="Name (Hindi)" value={form.hindiName} onChange={handleChange} style={inputStyle} />
      <input type="text" name="dob" placeholder="DOB (DD/MM/YYYY)" value={form.dob} onChange={handleChange} style={inputStyle} />
    </div>

    {/* Row 2 */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <input type="text" name="fatherName" placeholder="Father's Name (English)" value={form.fatherName} onChange={handleChange} style={inputStyle} />
      <input type="text" name="hindiFatherName" placeholder="Father's Name (Hindi)" value={form.hindiFatherName} onChange={handleChange} style={inputStyle} />
      <input type="text" name="address" placeholder="Address (English)" value={form.address} onChange={handleChange} style={inputStyle} />
    </div>

    {/* Row 3 */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <input type="text" name="hindiAddress" placeholder="Address (Hindi)" value={form.hindiAddress} onChange={handleChange} style={inputStyle} />
      <select name="gender" value={form.gender} onChange={handleChange} style={inputStyle}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
  <input
    type="text"
    name="issueDate"
    placeholder="Issue Date (DD/MM/YYYY)"
    value={form.issueDate}
    onChange={handleChange}
    style={{
      ...inputStyle,
      flex: 1,
      minWidth: "200px", // prevent shrinking too small
      padding: "8px",
      fontSize: "14px",
    }}
  />
  <button
    type="button"
    onClick={generateRandomDate}
    style={{
      padding: "8px 12px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      whiteSpace: "nowrap",
    }}
  >
    Generate
  </button>
</div>
    </div>

    {/* Row 4 */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <div style={{ flex: 1, display: "flex", gap: "5px" }}>
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={form.aadhaar}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="button" onClick={generateAadhaar} style={buttonStyle}>Generate</button>
      </div>

      <div style={{ flex: 1, display: "flex", gap: "5px" }}>
        <input
          type="text"
          name="vid"
          placeholder="VID"
          value={form.vid}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="button" onClick={generateVID} style={buttonStyle}>Generate</button>
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ flex: 1 }} />
    </div>

    {/* Submit */}
    <div style={{ textAlign: "center" }}>
      <button onClick={handleSubmit} style={buttonStyle}>Submit Form</button>
    </div>
  </div>
);
}

export default Form;
