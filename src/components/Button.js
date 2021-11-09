import React from "react";

const style = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  width: "60px",
  height: "60px",
  fontSize: "18px",
  outline: "none",
  cursor: "pointer",
};

const Button = (props) => {
  const { value, onClick } = props;
  return (
    <button style={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
