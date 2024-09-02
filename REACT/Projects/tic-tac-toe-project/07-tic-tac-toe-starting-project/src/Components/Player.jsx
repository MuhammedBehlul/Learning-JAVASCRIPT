import React, { useState } from "react";

export default function Player({initialName, symbol, isActive}) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handlePlayerNameChange(event) {
        setPlayerName(event.target.value);
    }

    function handleEdit() {      
        setIsEditing((prevState) => !prevState); 
    }

    let edittablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = "Edit";

    if (isEditing) {
        edittablePlayerName = <input type="text" required value={playerName} onChange={handlePlayerNameChange} />;
        btnCaption = "Save";
    }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {edittablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{btnCaption}</button>
    </li>
  );
}