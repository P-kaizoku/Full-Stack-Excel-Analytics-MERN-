import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/DashBoard/DashBoard";
import UploadForm from "./components/Upload/UploadForm";
import AnalyzeData from "./components/AnalyzeData/AnalyzeData";
import NotFound from "./components/NotFound/NotFound";
import UserHistory from "./components/DashBoard/UserHistory";
import Hero from "./components/Hero/Hero";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/analyze" element={<AnalyzeData />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/history" element={<UserHistory />} />
    </Routes>
  </BrowserRouter>
);

export default App;
