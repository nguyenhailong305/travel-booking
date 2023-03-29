import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import TourDetail from "../pages/TourDetail";
import Tours from "../pages/Tours";
import ThankYou from "../pages/ThankYou"; 

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Navigate to ="/" />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tour/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Routers;
