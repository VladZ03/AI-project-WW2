import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

const SecondPage = () => {
  const { setUserInput } = useContext(AppContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim()) {
      setUserInput(input);
      navigate("/third");
    }
  };

  return (
    <div className="app">
      <h1>Напишите какое сражение хотите провести</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={handleSend}>
          →
        </button>
      </div>
    </div>
  );
};

export default SecondPage;
