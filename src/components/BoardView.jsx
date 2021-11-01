import React, { useState } from "react";
import { Board } from "../helper";
import useEvent from "../helper/hooks/useEvent";
import Cell from "./Cell";
import Tile from "./Tile";

const BoardView = () => {
  const [board, setBoard] = useState(new Board());

  const handlekeyDown = (event) => {
    if (board.hasWon()) return;

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;

      // deep clone of board object
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );

      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handlekeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  } 

  return (
    <div>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          New Game
        </div>
        
      </div>
      <div className="board">
        {cells}
        {tiles}
      </div>
    </div>
  );
};

export default BoardView;
