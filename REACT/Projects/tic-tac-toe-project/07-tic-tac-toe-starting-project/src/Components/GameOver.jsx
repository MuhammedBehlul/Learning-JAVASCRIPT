import React from 'react';

export default function GameOver({ winner, players, onRestart }) {
    if (!winner) return null;

    return (
        <div id="game-over">
            {winner === 'draw' ? (
                <>
                    <h2>It's a draw!</h2>
                    <p>No one wins this time.</p>
                </>
            ) : (
                <>
                    <h2>{`${players[winner]} Wins!`}</h2>
                    <p>Congratulations {players[winner]}!</p>
                </>
            )}
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}
