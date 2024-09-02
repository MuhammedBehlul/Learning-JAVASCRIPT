import React, { useState } from 'react';

export default function GameBoard({ currentPlayer, onSelectSquare }) {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const [gameBoard, setGameBoard] = useState(board);

    function handleCellClick(rowIndex, cellIndex) {
        setGameBoard((prevState) => {
            const updatedBoard = prevState.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                    rIdx === rowIndex && cIdx === cellIndex ? currentPlayer : cell
                )
            );
            return updatedBoard;
        });

        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <li key={cellIndex} className="cell">
                                        <button onClick={() => handleCellClick(rowIndex, cellIndex)}>
                                            {cell}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
