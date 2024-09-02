import React, { useState } from "react";

export default function Player({name, symbol}) {

    const [playerName, setPlayerName] = useState(name);
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
    <li>
      <span className="player">
        {edittablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{btnCaption}</button>
    </li>
  );
}