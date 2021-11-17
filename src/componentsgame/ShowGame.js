import React, { useState } from "react";
import SquareGame from "./SquareGame";
import { listWinnerLines, calculateWinner, getCoordinates } from "./helpers";
import {defineHistory} from "./DefineValue";


// const initState = [Array(9).fill(null)];
const ShowGame = () => {

  const [board, setBoard] = useState(
    {
      square: defineHistory,
      history: [
        {
          coordinate: [0,0],
          player:null, 
          squares: defineHistory
        }
      ]
    }
  );
  const [activeHistory, setActiveHistory] = useState();
  const [stepNumber, setStepNumber] = useState(0);
  const [isXO, setIsXO] = useState(true);

  const handleClick = (item, index) => {

    const newSquare = board.square[index].value = isXO ? "X" : "O";
    console.log("board", board.history[0].coordinate);
    // console.log("defineHistory", );
    // const newHistory = 
    // [
    //   ...board, 
    //   {
    //     coordinate: defineHistory[index].coordinate
    //   }
    // ]
    setIsXO(!isXO);
  };


 
  return (
    <div className="wrap">
      <SquareGame
        onClick={handleClick}
      />
      <div>    
        
      </div>
      
    </div>
  );
};

export default ShowGame;
