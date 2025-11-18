import React, { useRef, useState, useEffect } from "react";
import "../App.css";

function UploadForm({ onUploadSuccess }) {
  const fileRef = useRef(null);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) setRole(storedRole);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "Viewer") {
      setStatus("❌ Viewers cannot upload files.");
      return;
    }

    const file = fileRef.current.files[0];
    if (!file) {
      setStatus("⚠️ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setStatus("✅ Uploaded successfully!");
      fileRef.current.value = "";
      if (onUploadSuccess) onUploadSuccess();
    } else {
      setStatus("❌ Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>
        Upload File{" "}
        <span
          className="meta"
          style={{ fontSize: "13px", fontWeight: "400", color: "#94a3b8" }}
        >
          ({role || "No Role Selected"})
        </span>
      </h3>

      <div className="form-fields">
        <input className="file" type="file" ref={fileRef} />
        {(role === "Admin" || role === "Member") && (
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "8px", alignSelf: "flex-start" }}
          >
            Upload
          </button>
        )}
      </div>

      {status && (
        <p
          className={`status ${
            status.includes("fail") || status.includes("❌")
              ? "status-bad"
              : "status-ok"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}

export default UploadForm;
