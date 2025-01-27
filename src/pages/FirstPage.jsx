import React from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <h1>Добро пожаловать на проект AI WAR</h1>
      <button className="start-button" onClick={() => navigate("/second")}>
        Начать
      </button>
    </div>
  );
};

export default FirstPage;
