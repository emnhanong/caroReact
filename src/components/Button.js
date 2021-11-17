import React from "react";

const Button = (props) => {
  const { value, onClick, isWinning } = props;
  return (
    <button
      onClick={onClick}
      className={"square " + (isWinning ? "square--won" : "")}
    >
      {value}
    </button>
  );
};

export default Button;
