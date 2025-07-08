import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Inbox from "../views/Inbox/Inbox";
import Login from "../views/LogIn/Login";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  );
};

export default router;
