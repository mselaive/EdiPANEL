
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Residentpanel from "layouts/Residentpanel";

import {I18nextProvider} from "react-i18next"
import i18next from "i18next";

import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  return children;
}



const root = ReactDOM.createRoot(document.getElementById("root"));


i18next.init({
  inrwepolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
});

root.render(
  <I18nextProvider i18n={i18next}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />

        <Route path="/residentpanel/*" element={<ProtectedRoute><Residentpanel /></ProtectedRoute>} />


        <Route path="/panel/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  </I18nextProvider>
);
