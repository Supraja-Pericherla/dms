import React from "react";
import "../App.css";

function IntroPage({ onGetStarted }) {
  return (
    <div className="intro-background">
      <div className="intro">
        <p className="intro-tagline">SMART COMPANY WITH PERFECT SPACE</p>
        <h1 className="intro-title">DOCUMENT MANAGEMENT SYSTEM</h1>
        <p className="intro-desc">
          Securely upload, organize, version, search, and control access for
          your digital documents—from anywhere! Enjoy straightforward file
          uploads, flexible permissions, powerfull search, document version
          history, and more—all in one place.
        </p>
        <button className="intro-btn" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default IntroPage;
