// Header.jsx
import { useAuth } from "../../features/auth/context/AuthContext";
import { FaGlobe } from "react-icons/fa";
import "./Header.css";

const Header = ({ onLogout, language, setLanguage }) => {
  const { logout, isAuthenticated } = useAuth(); // Agregar isAuthenticated

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
    console.log("Cerrar sesión");
  };

  if (!isAuthenticated) return null; // No renderizar si no está autenticado

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>Quiz AI</h1>
        <div className="header-actions">
          <div className="language-selector">
            <FaGlobe />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">Inglés</option>
              <option value="pt">Portugués</option>
              <option value="jp">Japonés</option>
            </select>
          </div>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
