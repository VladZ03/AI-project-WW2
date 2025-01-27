import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context";

const ThirdPage = () => {
  const { userInput, aiResponse, setAiResponse } = useContext(AppContext);

  useEffect(() => {
    const fetchAiResponse = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/ai-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: userInput }),
        });
        const data = await response.json();
        setAiResponse(data.response || "Ошибка от ИИ");
      } catch (error) {
        setAiResponse("Ошибка подключения к серверу.");
      }
    };

    if (userInput) fetchAiResponse();
  }, [userInput, setAiResponse]);

  return (
    <div className="app">
      <h2>Введенный человеком текст:</h2>
      <p>{userInput || "Нет текста."}</p>
      <h2>Ответ ИИ:</h2>
      <p>{aiResponse || "Ждем ответа..."}</p>
    </div>
  );
};

export default ThirdPage;
