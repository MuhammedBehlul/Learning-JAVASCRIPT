import React from 'react';

export default function GameOver({ winner, onRestart }) {
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
                    <h2>{`${winner} Wins!`}</h2>
                    <p>Congratulations!</p>
                </>
            )}
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}
