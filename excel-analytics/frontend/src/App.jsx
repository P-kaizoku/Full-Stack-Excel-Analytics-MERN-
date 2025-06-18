import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/DashBoard/DashBoard";
import UploadForm from "./components/Upload/UploadForm";
import AnalyzeData from "./AnalyzeData/AnalyzeData";
import NotFound from "./components/NotFound/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/analyze" element={<AnalyzeData />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
