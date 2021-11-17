import React from "react";
import "./ShowGame.css";

const ButtonGame = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {value}
    </button>
  );
};

export default ButtonGame;
