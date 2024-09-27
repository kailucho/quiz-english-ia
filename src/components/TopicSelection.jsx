import React from "react";
import unitsData from "../unitsData";
import "./TopicSelection.css"; // Importamos los estilos

const TopicSelection = ({ onSelectUnit }) => {
  return (
    <div className='topic-selection-container'>
      <h1 className='title'>Selecciona una unidad</h1>
      <div className='units-grid'>
        {unitsData.map((unit) => (
          <button
            key={unit.id}
            className='unit-button'
            onClick={() => onSelectUnit(unit)}
          >
            {unit.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
