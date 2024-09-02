import React, { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, cellIndex) {
    setGameTurns((prevTurns) => {
      let activePlayer = currentPlayer;
      if (prevTurns.length > 0) {
        activePlayer = prevTurns[prevTurns.length - 1].player === 'X' ? 'O' : 'X';
      }
      setCurrentPlayer(activePlayer === 'X' ? 'O' : 'X');
      return [...prevTurns, { player: activePlayer, row: rowIndex, cell: cellIndex }];
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={currentPlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={currentPlayer === 'O'} />
        </ol>
        <div>
          <GameBoard turns={gameTurns} onSelectSquare={handleSelectSquare} />
        </div>
      </div>
      <Log  turns={gameTurns}/>
    </main>
  );
}

export default App;
