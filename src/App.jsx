import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import CompanyRegister from "./pages/CompanyRegister";
import CompaniesList from "./pages/CompaniesList";



export default function App() {
  return (
    <Routes>
      {/* Защищённые страницы */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<About />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route path="/companies-list" element={<CompaniesList />} />

      </Route>

      {/* Публичные страницы */}
      <Route element={<PublicLayout />}>
        <Route path="/auth" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}