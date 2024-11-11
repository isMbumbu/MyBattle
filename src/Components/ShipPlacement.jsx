
/*
import React, { useState } from "react";

function ShipPlacement({ board, onPlaceShip, currentShipSize, shipsToPlace }) {
  const [orientation, setOrientation] = useState("horizontal");

  const handleCellClick = (x, y) => {
    // Only place ships if the current ship size is available
    if (shipsToPlace.length > 0) {
      const coordinates = getShipCoordinates(x, y, currentShipSize, orientation);
      if (coordinates) {
        onPlaceShip(coordinates, currentShipSize);
      }
    }
  };

  const getShipCoordinates = (x, y, length, orientation) => {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      const newX = orientation === "horizontal" ? x : x + i;
      const newY = orientation === "vertical" ? y : y + i;
      if (newX >= 10 || newY >= 10) return null; // Out of bounds
      coordinates.push([newX, newY]);
    }
    return coordinates;
  };

  return (
    <div>
      <h2>Place Your Ships</h2>
      <h3>Current Ship Length: {currentShipSize}</h3>
      <div>
        <button onClick={() => setOrientation("horizontal")}>Horizontal</button>
        <button onClick={() => setOrientation("vertical")}>Vertical</button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell.ship ? "ship" : ""}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.ship ? "🚢" : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShipPlacement;




/*
import React, { useState } from "react";
import Board from "./Board";

function ShipPlacement({ board, onPlaceShip, currentShipSize, shipsToPlace }) {
  const [coordinates, setCoordinates] = useState([]);
  const [direction, setDirection] = useState("horizontal"); // "horizontal" or "vertical"
  const [currentShips, setCurrentShips] = useState([]); // Track placed ships

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const handlePlaceShipClick = () => {
    // Validate that the coordinates are available for placement
    if (coordinates.length === currentShipSize) {
      // Place the ship by adding it to the board and updating the placed ships
      onPlaceShip(coordinates, currentShipSize, direction);
      setCurrentShips([...currentShips, { coordinates, direction }]);
      setCoordinates([]); // Clear coordinates for the next ship placement
    }
  };

  return (
    <div>
      <h2>Place your Ships</h2>
      <p>Place a ship of size {currentShipSize}</p>
      <div>
        <label>
          Direction:
          <select onChange={handleDirectionChange}>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>
      </div>
    
      <Board
        board={board}
        onCellClick={setCoordinates}
        isPlayer
        hitMissIndicators={{}} // No hit/miss indicators during placement
      />
      {coordinates.length === currentShipSize && (
        <button onClick={handlePlaceShipClick}>Place Ship</button>
      )}
    </div>
  );
}

export default ShipPlacement;*/



import React, { useState } from "react";

function ShipPlacement({ board, onPlaceShip, currentShipSize, shipsToPlace }) {
  const [orientation, setOrientation] = useState("horizontal");

  const handleCellClick = (x, y) => {
    if (shipsToPlace.length > 0) {
      const coordinates = getShipCoordinates(x, y, currentShipSize, orientation);
      if (coordinates) {
        onPlaceShip(coordinates, currentShipSize);
      }
    }
  };

  const getShipCoordinates = (x, y, length, orientation) => {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      const newX = orientation === "horizontal" ? x : x + i;
      const newY = orientation === "vertical" ? y : y + i;
      if (newX >= 10 || newY >= 10) return null; // Out of bounds
      coordinates.push([newX, newY]);
    }
    return coordinates;
  };

  return (
    <div>
      <h2>Place Your Ships</h2>
      <h3>Current Ship Length: {currentShipSize}</h3>
      <div>
        <button onClick={() => setOrientation("horizontal")}>Horizontal</button>
        <button onClick={() => setOrientation("vertical")}>Vertical</button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{ backgroundColor: cell.ship ? "gray" : "lightblue" }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ShipPlacement;