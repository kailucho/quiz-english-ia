import { useAuth } from "../../features/auth/context/AuthContext";
import { FaGlobe, FaWhatsapp } from "react-icons/fa";
import "./Header.css";

const Header = ({ onLogout, language, setLanguage }) => {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
    console.log("Cerrar sesión");
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Área de Marca */}
        <div className="app-branding">
          <h1
            className="app-title"
            onClick={() => window.location.reload()}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => {
              if (e.key === "Enter") window.location.reload();
            }}
            title="Recargar la página"
          >
            Quiz AI
          </h1>
        </div>

        {/* Navegación de Acciones */}
        <nav className="header-nav">
          <div className="language-selector">
            <label htmlFor="language-select" className="visually-hidden">
              Selecciona idioma
            </label>
            <FaGlobe aria-hidden="true" />
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">Inglés</option>
              <option value="pt">Portugués</option>
              <option value="jp">Japonés</option>
            </select>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <a
            href="https://wa.me/51933053739"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            aria-label="Contacto por WhatsApp"
          >
            <FaWhatsapp style={{ fontSize: "24px", color: "#25D366" }} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
