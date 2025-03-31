// TopicSelection.jsx
import React, { useState } from "react";
import {
  FaSmile,
  FaHome,
  FaMapMarkerAlt,
  FaClock,
  FaSun,
  FaRunning,
  FaQuestionCircle,
  FaChild,
  FaUsers,
  FaLightbulb,
  FaUserAlt,
  FaStar,
  FaGift,
  FaShoppingCart,
  FaRegSmile,
  FaSortNumericUp,
  FaSchool,
  FaUser,
  FaEllipsisH,
  FaGlobe,
  FaGraduationCap,
  FaBriefcase,
  FaRegClock,
  FaStopwatch,
} from "react-icons/fa";

import unitsDataEN from "../../../utils/unitsDataEN";
import unitsDataPT from "../../../utils/unitsDataPT";
import unitsDataJP from "../../../utils/unitsDataJP";
import "./TopicSelection.css";

// Updated mapping of strings to icon components with inline styles for color
const icons = {
  FaSmile: <FaSmile style={{ color: "#FFCC00" }} />, // Golden yellow
  FaHome: <FaHome style={{ color: "#FF6699" }} />, // Vibrant pink
  FaMapMarkerAlt: <FaMapMarkerAlt style={{ color: "#0099FF" }} />, // Bright blue
  FaClock: <FaClock style={{ color: "#9933FF" }} />, // Deep purple
  FaSun: <FaSun style={{ color: "#FFA500" }} />, // Orange
  FaRunning: <FaRunning style={{ color: "#00CC66" }} />, // Green
  FaQuestionCircle: <FaQuestionCircle style={{ color: "#FF33CC" }} />, // Neon pink
  FaChild: <FaChild style={{ color: "#66CCFF" }} />, // Light blue
  FaUsers: <FaUsers style={{ color: "#FF3366" }} />, // Rosy red
  FaLightbulb: <FaLightbulb style={{ color: "#FFFF33" }} />, // Bright yellow
  FaUserAlt: <FaUserAlt style={{ color: "#33CCFF" }} />, // Sky blue
  FaStar: <FaStar style={{ color: "#FFCC33" }} />, // Mustard yellow
  FaGift: <FaGift style={{ color: "#CC66FF" }} />, // Lilac
  FaShoppingCart: <FaShoppingCart style={{ color: "#33FF99" }} />, // Mint green
  FaRegSmile: <FaRegSmile style={{ color: "#FFCC00" }} />, // Golden yellow
  FaSortNumericUp: <FaSortNumericUp style={{ color: "#0099FF" }} />, // Bright blue
  FaSchool: <FaSchool style={{ color: "#9933FF" }} />, // Deep purple
  FaUser: <FaUser style={{ color: "#00CC66" }} />, // Green
  FaEllipsisH: <FaEllipsisH style={{ color: "#FF33CC" }} />, // Neon pink
  FaGlobe: <FaGlobe style={{ color: "#66CCFF" }} />, // Light blue
  FaGraduationCap: <FaGraduationCap style={{ color: "#FF3366" }} />, // Rosy red
  FaBriefcase: <FaBriefcase style={{ color: "#FFFF33" }} />, // Bright yellow
  FaRegClock: <FaRegClock style={{ color: "#33CCFF" }} />, // Sky blue
  FaStopwatch: <FaStopwatch style={{ color: "#FFCC33" }} />, // Mustard yellow
};

const dataByLanguage = {
  en: unitsDataEN,
  pt: unitsDataPT,
  jp: unitsDataJP,
};

const TopicSelection = ({ language, onSelectUnit = () => {} }) => {
  // Seleccionamos la data correspondiente al idioma
  const unitsData = dataByLanguage[language] || [];
  // Obtenemos los tipos únicos de nivel (por ejemplo, "Basic 1", "Básico 1", "ベーシック 1", etc.)
  const levelTypes = [...new Set(unitsData.map((unit) => unit.type))];
  // Estado para el nivel seleccionado; por defecto el primer nivel
  const [selectedLevel, setSelectedLevel] = useState(levelTypes[0]);

  // Filtramos las unidades según el nivel seleccionado
  const filteredUnits = unitsData.filter(
    (unit) => unit.type === selectedLevel
  );

  return (
    <div className="topic-selection">
      <div className="content-wrapper">
        <h2 className="section-title">Niveles disponibles</h2>

        {/* Tarjetas de niveles */}
        <div className="levels-wrapper">
          {levelTypes.map((level) => (
            <div
              key={level}
              className={`level-card ${selectedLevel === level ? "active" : ""}`}
              onClick={() => setSelectedLevel(level)}
            >
              <h3>{level}</h3>
              <button className="start-button">
                {selectedLevel === level ? "Seleccionado" : "Iniciar"}
              </button>
            </div>
          ))}
        </div>

        {/* Tarjetas de unidades (se muestran hasta 4 unidades del nivel seleccionado) */}
        <div className="units-grid">
          {filteredUnits.map((unit) => (
            <button
              key={unit.id}
              className="unit-card"
              onClick={() => onSelectUnit(unit,language)}
            >
              <div className="icon-placeholder">
                {icons[unit.icon] || <FaSmile style={{ color: "#FFCC00" }} />}
              </div>
              <h4>{unit.theme}</h4>
              <p>{unit.content.trim().split("\n")[0]}</p>
              <span className="start-link">Iniciar</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSelection;
