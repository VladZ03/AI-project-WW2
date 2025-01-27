import React from "react";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/second" element={<SecondPage />} />
      <Route path="/third" element={<ThirdPage />} />
    </Routes>
  );
};

export default App;
