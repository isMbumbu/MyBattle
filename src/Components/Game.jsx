/*
import React, { useState, useEffect } from "react";
import Board from "./Board.jsx";
import ShipPlacement from "./ShipPlacement.jsx";
import { initializeBoard, placeShipOnBoard, takeShot, getRandomCoordinates, checkShipPlacementValid } from "../utils/helpers.js";

function Game() {
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [opponentBoard, setOpponentBoard] = useState(initializeBoard());
  const [turn, setTurn] = useState("player");
  const [phase, setPhase] = useState("placement");
  const [shipsToPlace, setShipsToPlace] = useState([5, 4, 3, 3, 2]); // Order of ships to place
  const [playerShips, setPlayerShips] = useState([]);
  const [opponentShips, setOpponentShips] = useState([]);

  // Handle placing ships on the player's board
  const handlePlaceShip = (coordinates, length) => {
    if (checkShipPlacementValid(playerBoard, coordinates, length)) {
      const updatedBoard = placeShipOnBoard(playerBoard, coordinates, length);
      setPlayerBoard(updatedBoard);
      setPlayerShips([...playerShips, { coordinates, length }]);
      setShipsToPlace(shipsToPlace.filter((shipLength) => shipLength !== length)); // Remove placed ship from the list

      if (shipsToPlace.length === 1) {
        setPhase("gameplay");
        setOpponentShips(generateOpponentShips());
      }
    } else {
      alert("Invalid ship placement");
    }
  };

  // Generate random ships for the opponent
  const generateOpponentShips = () => {
    let ships = [];
    let tempBoard = initializeBoard();

    [5, 4, 3, 3, 2].forEach((length) => {
      const coords = getRandomCoordinates(tempBoard, length);
      tempBoard = placeShipOnBoard(tempBoard, coords, length);
      ships.push({ coordinates: coords, length });
    });

    setOpponentBoard(tempBoard);
    return ships;
  };

  // Handle shooting (player or opponent taking a turn)
  const handleTakeTurn = (x, y) => {
    if (phase === "gameplay") {
      const targetBoard = turn === "player" ? opponentBoard : playerBoard;
      const updatedBoard = takeShot(targetBoard, x, y);

      if (turn === "player") {
        const hit = checkHit(opponentShips, x, y);
        if (hit) console.log("Player hit an opponent ship!");
        setOpponentBoard(updatedBoard);
        setTurn("opponent");
      } else {
        const hit = checkHit(playerShips, x, y);
        if (hit) console.log("Opponent hit your ship!");
        setPlayerBoard(updatedBoard);
        setTurn("player");
      }
    }
  };

  // Check if the shot hit any ship
  const checkHit = (ships, x, y) => {
    return ships.some((ship) =>
      ship.coordinates.some(([sx, sy]) => sx === x && sy === y)
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {phase === "placement" ? (
        <ShipPlacement
          board={playerBoard}
          onPlaceShip={handlePlaceShip}
          currentShipSize={shipsToPlace[0]} // Pass current ship size to place
          shipsToPlace={shipsToPlace}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>Your Board</h2>
            <Board board={playerBoard} onCellClick={handleTakeTurn} isPlayer />
          </div>
          <div>
            <h2>Opponent's Board</h2>
            <Board board={opponentBoard} onCellClick={handleTakeTurn} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;






/*
import React, { useState, useEffect } from "react";
import Board from "./Board.jsx";
import ShipPlacement from "./ShipPlacement.jsx";
import { initializeBoard, placeShipOnBoard, takeShot, getRandomCoordinates, checkShipPlacementValid } from "../utils/helpers.js";

function Game() {
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [opponentBoard, setOpponentBoard] = useState(initializeBoard());
  const [turn, setTurn] = useState("player");
  const [phase, setPhase] = useState("placement");
  const [shipsToPlace, setShipsToPlace] = useState([5, 4, 3, 3, 2]); // Order of ships to place
  const [playerShips, setPlayerShips] = useState([]);
  const [opponentShips, setOpponentShips] = useState([]);
  const [hitMissIndicators, setHitMissIndicators] = useState({});

  useEffect(() => {
    if (turn === "player") return;

    // Opponent turn to shoot after 2 seconds
    setTimeout(() => {
      const randomShot = getRandomCoordinates(playerBoard, 1); // Get random shot for opponent
      handleOpponentShot(randomShot[0][0], randomShot[0][1]); // Opponent attacks
    }, 2000); // 2 seconds delay
  }, [turn]);

  // Handle placing ships on the player's board
  const handlePlaceShip = (coordinates, length) => {
    if (checkShipPlacementValid(playerBoard, coordinates, length)) {
      const updatedBoard = placeShipOnBoard(playerBoard, coordinates, length);
      setPlayerBoard(updatedBoard);
      setPlayerShips([...playerShips, { coordinates, length }]);
      setShipsToPlace(shipsToPlace.filter((shipLength) => shipLength !== length)); // Remove placed ship from the list

      if (shipsToPlace.length === 1) {
        setPhase("gameplay");
        setOpponentShips(generateOpponentShips());
      }
    } else {
      alert("Invalid ship placement");
    }
  };

  // Generate random ships for the opponent
  const generateOpponentShips = () => {
    let ships = [];
    let tempBoard = initializeBoard();

    [5, 4, 3, 3, 2].forEach((length) => {
      const coords = getRandomCoordinates(tempBoard, length);
      tempBoard = placeShipOnBoard(tempBoard, coords, length);
      ships.push({ coordinates: coords, length });
    });

    setOpponentBoard(tempBoard);
    return ships;
  };

  // Handle player's turn
  const handleTakeTurn = (x, y) => {
    if (phase === "gameplay") {
      const targetBoard = turn === "player" ? opponentBoard : playerBoard;
      const updatedBoard = takeShot(targetBoard, x, y);
      const hit = checkHit(opponentShips, x, y);
      if (turn === "player" && hit) {
        setHitMissIndicators({ ...hitMissIndicators, [`${x},${y}`]: "hit" });
      } else if (turn === "player") {
        setHitMissIndicators({ ...hitMissIndicators, [`${x},${y}`]: "miss" });
      }

      if (turn === "player") {
        setOpponentBoard(updatedBoard);
        setTurn("opponent");
      }
    }
  };

  // Opponent's random shot on player's board
  const handleOpponentShot = (x, y) => {
    const hit = checkHit(playerShips, x, y);
    if (hit) {
      setHitMissIndicators({ ...hitMissIndicators, [`${x},${y}`]: "hit" });
    } else {
      setHitMissIndicators({ ...hitMissIndicators, [`${x},${y}`]: "miss" });
    }
    const updatedBoard = takeShot(playerBoard, x, y);
    setPlayerBoard(updatedBoard);
    setTurn("player");
  };

  // Check if a shot hit any ship
  const checkHit = (ships, x, y) => {
    return ships.some((ship) =>
      ship.coordinates.some(([sx, sy]) => sx === x && sy === y)
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {phase === "placement" ? (
        <ShipPlacement
          board={playerBoard}
          onPlaceShip={handlePlaceShip}
          currentShipSize={shipsToPlace[0]} // Pass current ship size to place
          shipsToPlace={shipsToPlace}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>Your Board</h2>
            <Board
              board={playerBoard}
              onCellClick={handleTakeTurn}
              isPlayer
              hitMissIndicators={hitMissIndicators} // Pass hitMissIndicators to show hits/misses
            />
          </div>
          <div>
            <h2>Opponent's Board</h2>
            <Board
              board={opponentBoard}
              onCellClick={handleTakeTurn}
              hitMissIndicators={hitMissIndicators} // Pass hitMissIndicators to show hits/misses
              isOpponent // Tell Board component it's the opponent's board
            />
          </div>
        </div>
      )}
    </div>
  );
}
*/


import React, { useState, useEffect } from "react";
import Board from "./Board.jsx";
import ShipPlacement from "./ShipPlacement.jsx";
import { initializeBoard, placeShipOnBoard, takeShot, checkShipPlacementValid, getRandomCoordinates } from "../utils/helpers.js";

function Game() {
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [opponentBoard, setOpponentBoard] = useState(initializeBoard());
  const [turn, setTurn] = useState("player");
  const [phase, setPhase] = useState("placement");
  const [shipsToPlace, setShipsToPlace] = useState([5, 4, 3, 3, 2]); // Order of ships to place
  const [playerShips, setPlayerShips] = useState([]);
  const [opponentShips, setOpponentShips] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Handle placing ships on the player's board
  const handlePlaceShip = (coordinates, length) => {
    if (checkShipPlacementValid(playerBoard, coordinates, length)) {
      const updatedBoard = placeShipOnBoard(playerBoard, coordinates, length);
      setPlayerBoard(updatedBoard);
      setPlayerShips([...playerShips, { coordinates, length }]);
      setShipsToPlace(shipsToPlace.filter((shipLength) => shipLength !== length)); // Remove placed ship from the list

      if (shipsToPlace.length === 1) {
        setPhase("gameplay");
        setOpponentShips(generateOpponentShips());
      }
    } else {
      alert("Invalid ship placement");
    }
  };

  // Generate random ships for the opponent
  const generateOpponentShips = () => {
    let ships = [];
    let tempBoard = initializeBoard();

    [5, 4, 3, 3, 2].forEach((length) => {
      const coords = getRandomCoordinates(tempBoard, length);
      tempBoard = placeShipOnBoard(tempBoard, coords, length);
      ships.push({ coordinates: coords, length });
    });

    setOpponentBoard(tempBoard);
    return ships;
  };

  // Handle shooting (player or opponent taking a turn)
  const handleTakeTurn = (x, y) => {
    if (phase === "gameplay" && !gameOver) {
      const targetBoard = turn === "player" ? opponentBoard : playerBoard;
      const updatedBoard = takeShot(targetBoard, x, y);
      let hit = false;

      if (turn === "player") {
        hit = checkHit(opponentShips, x, y);
        if (hit) console.log("Player hit an opponent ship!");
        setOpponentBoard(updatedBoard);
        setTurn("opponent");
      } else {
        hit = checkHit(playerShips, x, y);
        if (hit) console.log("Opponent hit your ship!");
        setPlayerBoard(updatedBoard);
        setTurn("player");
      }

      checkGameOver();
    }
  };

  // Check if the shot hit any ship
  const checkHit = (ships, x, y) => {
    return ships.some((ship) =>
      ship.coordinates.some(([sx, sy]) => sx === x && sy === y)
    );
  };

  // Check if the game is over
  const checkGameOver = () => {
    const isPlayerShipsSunk = playerShips.every((ship) =>
      ship.coordinates.every(([x, y]) => playerBoard[x][y].hit)
    );
    const isOpponentShipsSunk = opponentShips.every((ship) =>
      ship.coordinates.every(([x, y]) => opponentBoard[x][y].hit)
    );

    if (isPlayerShipsSunk || isOpponentShipsSunk) {
      setGameOver(true);
      console.log(isPlayerShipsSunk ? "Opponent Wins!" : "Player Wins!");
    }
  };

  // Opponent randomly selects a target after the player's turn
  useEffect(() => {
    if (turn === "opponent" && !gameOver) {
      setTimeout(() => {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        handleTakeTurn(randomX, randomY);
      }, 2000);
    }
  }, [turn]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h2>{turn === "player" ? "Your Turn" : "Opponent's Turn"}</h2>
      </div>
      {phase === "placement" ? (
        <ShipPlacement
          board={playerBoard}
          onPlaceShip={handlePlaceShip}
          currentShipSize={shipsToPlace[0]} // Pass current ship size to place
          shipsToPlace={shipsToPlace}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>Your Board</h2>
            <Board board={playerBoard} onCellClick={handleTakeTurn} isPlayer />
          </div>
          <div>
            <h2>Opponent's Board</h2>
            <Board board={opponentBoard} onCellClick={handleTakeTurn} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;