/*

export function initializeBoard() {
    return Array(10)
      .fill(null)
      .map(() => Array(10).fill({ ship: false, hit: false }));
  }
  
  // Check if ship placement is valid (no overlap)
  export function checkShipPlacementValid(board, coordinates, length) {
    return coordinates.every(([x, y]) => {
      return x >= 0 && x < 10 && y >= 0 && y < 10 && !board[x][y].ship;
    });
  }
  
  export function placeShipOnBoard(board, coordinates, length) {
    const newBoard = [...board];
    coordinates.forEach(([x, y]) => {
      newBoard[x][y] = { ...newBoard[x][y], ship: true };
    });
    return newBoard;
  }
  
  export function takeShot(board, x, y) {
    const newBoard = [...board];
    newBoard[x][y] = { ...newBoard[x][y], hit: true };
    return newBoard;
  }
  
  export function getRandomCoordinates(board, length) {
    const coordinates = [];
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      const newCoordinates = [];
      for (let i = 0; i < length; i++) {
        const newX = orientation === "horizontal" ? x : x + i;
        const newY = orientation === "vertical" ? y : y + i;
        if (newX >= 10 || newY >= 10 || board[newX][newY].ship) break;
        newCoordinates.push([newX, newY]);
      }
      if (newCoordinates.length === length) {
        placed = true;
        coordinates.push(...newCoordinates);
      }
    }
    return coordinates;
  }




/*

    export const initializeBoard = () => {
        const board = Array(10).fill(null).map(() => Array(10).fill(null));
        return board;
      };
      
      export const placeShipOnBoard = (board, coordinates, length) => {
        const newBoard = board.map((row) => row.slice());
        coordinates.forEach(([x, y]) => {
          newBoard[x][y] = "ship";
        });
        return newBoard;
      };
      
      export const getRandomCoordinates = (board, length) => {
        // Logic for getting random valid coordinates for ship placement
      };
      
      export const checkShipPlacementValid = (board, coordinates, length) => {
        // Logic for checking if ship placement is valid
      };
      
      export const takeShot = (board, x, y) => {
        const newBoard = board.map((row) => row.slice());
        newBoard[x][y] = "hit"; // Mark hit on the board
        return newBoard;
      };
      */




      export const initializeBoard = () => {
        return Array.from({ length: 10 }, () => Array(10).fill({ ship: false, hit: false, miss: false }));
      };
      
      export const placeShipOnBoard = (board, coordinates, length) => {
        const newBoard = board.map(row => row.slice());
        coordinates.forEach(([x, y]) => {
          newBoard[x][y] = { ship: true, hit: false, miss: false };
        });
        return newBoard;
      };
      
      export const getRandomCoordinates = (board, length) => {
        const randomX = Math.floor(Math.random() * (10 - length));
        const randomY = Math.floor(Math.random() * 10);
        const coordinates = [];
        for (let i = 0; i < length; i++) {
          coordinates.push([randomX + i, randomY]);
        }
        return coordinates;
      };
      
      export const checkShipPlacementValid = (board, coordinates, length) => {
        return coordinates.every(([x, y]) => board[x][y].ship === false);
      };
      
      export const takeShot = (board, x, y) => {
        const newBoard = board.map(row => row.slice());
        if (newBoard[x][y].ship) {
          newBoard[x][y] = { ship: false, hit: true, miss: false };
        } else {
          newBoard[x][y] = { ship: false, hit: false, miss: true };
        }
        return newBoard;
      };