// src/Routes.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import IntroPage from "./LoginScreens/IntroPage";
import LandingPage from "./LoginScreens/LandingPage";
import UserRolePage from "./LoginScreens/UserRole";
import "./App.css";

function IntroWithNav() {
  const navigate = useNavigate();
  return <IntroPage onGetStarted={() => navigate("/userRole")} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IntroWithNav />} />
      <Route path="/userRole" element={<UserRolePage />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}
