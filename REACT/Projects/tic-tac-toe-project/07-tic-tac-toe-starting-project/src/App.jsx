import React, { useState, useEffect } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";

const WinConditions = [
  // Horizontal
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Vertical
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonal
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];

function App() {
  const [players, setPlayers] = useState({ 
    X: 'Player 1',
    O: 'Player 2'
  });
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    controlWinner();
  }, [gameTurns]);

  function controlWinner() {
    for (const combination of WinConditions) {
      const [a, b, c] = combination;
      const aTurn = gameTurns.find(turn => turn.row === a[0] && turn.cell === a[1]);
      const bTurn = gameTurns.find(turn => turn.row === b[0] && turn.cell === b[1]);
      const cTurn = gameTurns.find(turn => turn.row === c[0] && turn.cell === c[1]);

      if (aTurn && bTurn && cTurn && aTurn.player === bTurn.player && aTurn.player === cTurn.player) {
        setWinner(aTurn.player);
        return;
      }
    }

    if (gameTurns.length === 9) {
      setWinner('draw');
    }
  }

  function handleSelectSquare(rowIndex, cellIndex) {
    if (winner) return;  // Prevent further moves after the game is won

    setGameTurns((prevTurns) => {
      let activePlayer = currentPlayer;
      setCurrentPlayer(activePlayer === 'X' ? 'O' : 'X');
      return [...prevTurns, { player: activePlayer, row: rowIndex, cell: cellIndex }];
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName
    }));
  }

  function handleRestart() {
    setGameTurns([]);
    setCurrentPlayer('X');
    setWinner(null);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={currentPlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={currentPlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        <div>
          <GameBoard turns={gameTurns} onSelectSquare={handleSelectSquare} />
        </div>
      </div>
      <Log turns={gameTurns} />
      {winner && <GameOver winner={winner} players={players} onRestart={handleRestart} />}  {/* Conditionally render GameOver */}
    </main>
  );
}

export default App;
