/*
import React from "react";

function Cell({ x, y, cell, onClick, isPlayer }) {
  let cellStyle = {};
  if (cell.hit) {
    cellStyle.backgroundColor = "red"; // Hit
  } else if (cell.ship) {
    cellStyle.backgroundColor = "gray"; // Ship is hidden
  } else {
    cellStyle.backgroundColor = "lightblue"; // Empty
  }

  return (
    <div
      className="cell"
      style={cellStyle}
      onClick={() => onClick(x, y)}
    ></div>
  );
}

export default Cell;







import React from "react";

function Cell({ cell, onClick, isPlayer, hitMissIndicators }) {
  // Safeguard to ensure cell is defined before accessing its properties
  if (!cell) {
    return <div className="cell" onClick={onClick}></div>;
  }

  const handleClick = () => {
    if (!cell.hit) onClick(); // Only allow click if the cell is not already hit
  };

  // Determine if the cell is hit or missed
  const cellClass = cell.hit ? (cell.ship ? "hit" : "miss") : "";

  return (
    <div
      className={`cell ${cellClass}`}
      onClick={handleClick}
    >
     =
      {isPlayer && cell.ship ? "🚢" : ""}
    </div>
  );
}

export default Cell;*/



import React from "react";


function Cell({ x, y, cell, onClick, isPlayer }) {
  let cellStyle = {};

  if (cell.hit) {
    cellStyle.backgroundColor = "red"; // Hit
  } else if (cell.miss) {
    cellStyle.backgroundColor = "green"; // Missed shot (green)
  } else if (cell.ship && isPlayer) {
    cellStyle.backgroundColor = "gray"; // Player's ship is visible during placement
  } else {
    cellStyle.backgroundColor = "lightblue"; // Empty space
  }

  return (
    <div
      className="cell"
      style={cellStyle}
      onClick={() => onClick(x, y)}
    ></div>
  );
}

export default Cell;