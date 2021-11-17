import React from "react";
import { defineHistory } from "./DefineValue";
import ButtonGame from "./ButtonGame";
const Square = ({ squares, onClick }) => {
  const style = {
    display: "inline-grid",
    gridTemplate: "repeat(3,1fr) / repeat(3, 1fr)",
    border: "1px solid #ccc",
    height:"100%",
  };
  return (
    <div style={style}>
      {defineHistory.map((item, index) => (
        <ButtonGame
          key={index}
          value={item.value}
          onClick={() => onClick(item,index)}
        />
      ))}
    </div>
  );
};

export default Square;
