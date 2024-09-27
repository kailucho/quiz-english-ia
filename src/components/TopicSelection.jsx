import React from "react";
import unitsData from "../unitsData";
import "./TopicSelection.css"; // Importamos los estilos

const TopicSelection = ({ onSelectUnit }) => {
  // Obtenemos los tipos únicos de unidades
  const unitTypes = [...new Set(unitsData.map((unit) => unit.type))];

  return (
    <div className='topic-selection-container'>
      <h1 className='app-title'>Bienvenida, Yina</h1>
      <h2 className='title'>Selecciona una unidad</h2>
      {unitTypes.map((type) => (
        <div key={type} className='unit-type-section'>
          <h3 className='unit-type-title'>{type}</h3>
          <div className='units-grid'>
            {unitsData
              .filter((unit) => unit.type === type)
              .map((unit) => (
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
      ))}
    </div>
  );
};

export default TopicSelection;
