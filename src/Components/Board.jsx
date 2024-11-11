/*
import React from "react";
import Cell from "./Cell.jsx";

function Board({ board, onCellClick, isPlayer }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            x={rowIndex}
            y={colIndex}
            cell={cell}
            onClick={onCellClick}
            isPlayer={isPlayer}
          />
        ))
      )}
    </div>
  );
}

export default Board;




import React from "react";
import Cell from "./Cell";

function Board({ board, onCellClick, isPlayer, hitMissIndicators }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isPlayer={isPlayer}
            hitMissIndicators={hitMissIndicators} // Pass this to handle hit/miss colors
          />
        ))
      )}
    </div>
  );
}

export default Board;*/







import React from "react";
import Cell from "./Cell.jsx";

function Board({ board, onCellClick, isPlayer }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            x={rowIndex}
            y={colIndex}
            cell={cell}
            onClick={onCellClick}
            isPlayer={isPlayer}
          />
        ))
      )}
    </div>
  );
}

export default Board;