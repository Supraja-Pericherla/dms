import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentList from "../Components/DocumentList";
import UploadForm from "../Components/UploadForm";
import "../App.css";

function LandingPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <div className="landing-page">
      <div className="app-navbar">
        <div className="app-navbar-inner">
          <div className="app-brand">DMS</div>
          <div className="app-actions">
            <span className="app-role">Role: {role || "No Role"}</span>
            <button className="app-back" onClick={() => navigate("/userRole")}>
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="landing-body">
        <div className="drive-layout no-sidebar">
          <main className="drive-main">
            <div className="drive-toolbar">
              <div className="drive-left">
                <span className="drive-label">My Drive</span>
              </div>
              <div className="drive-right">
                <button
                  className="drive-action-btn"
                  title="List view"
                  onClick={() => setViewMode("list")}
                >
                  ≡
                </button>
                <button
                  className="drive-action-btn"
                  title="Grid view"
                  onClick={() => setViewMode("grid")}
                >
                  ▦
                </button>
              </div>
            </div>

            {role === "Admin" && (
              <div
                className="panel-dark"
                style={{ padding: 16, marginBottom: 16 }}
              >
                <div className="drive-subtle">Quick upload</div>
                <UploadForm
                  onUploadSuccess={() => setRefreshTrigger((prev) => !prev)}
                />
              </div>
            )}

            <div className="panel-dark drive-table" style={{ padding: 8 }}>
              <div className="drive-welcome">Files</div>
              <DocumentList
                refreshTrigger={refreshTrigger}
                viewMode={viewMode}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
