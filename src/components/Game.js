import React, { useState } from "react";
import { calculateWinner, getCoordinates, listWinnerLines } from "../helpers";
import Square from "./Square";

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
  
  };




  const moveToStep = (step) => {
    const indexCoordinatesHistory = coordinatesHistory.findIndex(
      (item) => item === coordinatesHistory[step]
    );  

    const newCoordinatesHistory = coordinatesHistory.slice(
      0,
      indexCoordinatesHistory + 1
    );
      
    const indexHistory = history.findIndex(
      (item) => item === history[step]
    );

    const newHistory = history.slice(0, indexHistory + 1);
    
    setCoordinatesHistory(newCoordinatesHistory)
    setHistory(newHistory);

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
        : "Go to start (0,0)";
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
    setToggle(false);
    setCoordinatesHistory([[]]);
    setIsXO(true);
    setStepNumber(0);
    setHistory([initState]);
  };

  const renderReset = (name) => {
    return (
      <button className="btn-reset" onClick={handleReset}>
        {name}
      </button>
    );
  };

  const getWinner = () => {
    if (winner) {
      return winner.isWinner;
    }
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
      return "Winner: " + getWinner();
    } else {
      return "Next player: " + (isXO ? "X" : "O");
    }
  };

  return (
    <div>
      <div className="wrap-all">
        <div className="wrap-left">
          <Square
            squares={history[stepNumber]}
            onClick={handleClick}
            winningSquares={winner ? winner.line : []}
          />
          <div className="wrap-text">
            <h1>{winner ? `"${getWinner()}"  is Winner` : ""}</h1>
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
          <button className="toggle" onClick={toggleHistory}>
            Toggle Moves
          </button>
          <div>
            <ul>{toggle ? renderHistory().reverse() : renderHistory()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
