import React, { useState } from "react";
import { calculateWinner, getCoordinates, listWinnerLines } from "../helpers";
import Square from "./Square";

const style = {
  backgroundColor: "#F3C2BE",
  lineHeight: "40px",
  padding: "0px 40px",
  fontSize: "18px",
  cursor: "pointer",
  color: "#fff",
  border: "1px solid #F3C2BE",
  transition: "0.3s",
};

const styleCaro = {
  display: "flex",
};

const Game = () => {
  const initState = Array(9).fill(null);
  const [history, setHistory] = useState([initState]);
  const [coordinatesHistory, setCoordinatesHistory] = useState([[]]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXO, setIsXO] = useState(true);
  const [toggle, setToggle] = useState(false);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (index) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const historyClone = [...current];
    const coordinates = getCoordinates(listWinnerLines, index);

    if (winner || historyClone[index]) return;
    historyClone[index] = isXO ? "X" : "O";
    setHistory([...timeInHistory, historyClone]);
    setStepNumber(timeInHistory.length);
    setIsXO(!isXO);
    setCoordinatesHistory([...coordinatesHistory, coordinates]);
    console.log(coordinatesHistory);
  };



  const moveToStep = (step) => {
    setStepNumber(step);
    setIsXO(step % 2 === 0);
  };

  const toggleHistory = () => {
    setToggle(!toggle);
  };

  const renderHistory = () => {
    return history.map((step, move) => {
      const destination = move
        ? `Go to move# ${move} (${coordinatesHistory[move]})`
        : "Go to start";
      return (
        <li key={move} className="list-history">
          <button className="move-btn" onClick={() => moveToStep(move)}>
            {destination}
          </button>
        </li>
      );
    });
  };

  const handleReset = () => {
    setIsXO(true);
    setStepNumber(0);
    setHistory([initState]);
  }

  const renderReset = (name) => {
    return (
      <button style={style} onClick={handleReset}>
        {name}
      </button>
    );
  };

  const handleCheckDraw = () => {
    let count = 0;
    history.forEach(function (item) {
      if (item !== null) {
        count++;
      }
    });
    if (count === 10 && winner === null) {
      return <h1>Draw!</h1>;
    }
  };

  const handleCheckWinner = () => {
    if (winner) {
      return "Winner: " + winner;
    } else {
      return "Next player: " + (isXO ? "X" : "O");
    }
  };

  return (
    <div>
      <div style={styleCaro}>
        <div className="wrap-left">
          <Square squares={history[stepNumber]} onClick={handleClick} />
          <div className="wrap-text">
            <h1>{winner ? `"${winner}" is Winner` : ""}</h1>
            <div>{handleCheckDraw()}</div>
            <div>
              {winner || handleCheckDraw()
                ? renderReset("Play again")
                : renderReset("Reset Game")}
            </div>
          </div>
        </div>  
        <div></div>
        <div className="text-right">
          <div className="check-winner">{handleCheckWinner()}</div>
          <button className="toggle" onClick={toggleHistory}>Toggle Moves</button>
          <div>
            <ul>{toggle ? renderHistory().reverse() : renderHistory()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
