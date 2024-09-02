import React, { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleSelectSquare() {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player initialName="Player 1" symbol="X" isActive={currentPlayer=== 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={currentPlayer==='O'}/>
        </ol>
        <div>
          <GameBoard currentPlayer={currentPlayer} onSelectSquare={handleSelectSquare} />
        </div>
      </div>
    </main>
  );
}

export default App;
