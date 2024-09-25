import React from "react";
import unitsData from "../unitsData";

const TopicSelection = ({ onSelectUnit }) => {
  return (
    <div>
      <h1>Selecciona una unidad</h1>
      <ul>
        {unitsData.map((unit) => (
          <li key={unit.id}>
            <button onClick={() => onSelectUnit(unit)}>{unit.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicSelection;
