import React from 'react';

export default function GameBoard({ turns, onSelectSquare }) {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    // Update the board based on the turns array
    for (let i = 0; i < turns.length; i++) {
        const { player, row, cell } = turns[i];
        board[row][cell] = player;
    }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((cell, cellIndex) => (
                            <li key={cellIndex} className="cell">
                                <button 
                                    onClick={() => onSelectSquare(rowIndex, cellIndex)}
                                    disabled={cell !== null}  // Disable the button if the cell is already occupied
                                >
                                    {cell}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
