import React, { useState } from "react";

export default function Player({name, symbol}) {

    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(true);
        isEditing ? <input type="text" value={name} /> : <span className="player-name">{name}</span>
    }

  return (
    <li>
      <span className="player">
        <span className="player-name">{name}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>Edit</button>
    </li>
  );
}