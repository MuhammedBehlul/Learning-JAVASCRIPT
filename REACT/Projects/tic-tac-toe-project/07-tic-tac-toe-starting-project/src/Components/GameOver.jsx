import React from 'react';

export default function GameOver({ winner, onRestart }) {
  if (!winner) return null;

  return (
    <div id="game-over">
      <h2>{winner} Wins!</h2>
      <p>Congratulations!</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}
