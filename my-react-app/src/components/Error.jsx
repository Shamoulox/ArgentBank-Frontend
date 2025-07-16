import { NavLink } from "react-router-dom";
import "../styles/main.css";

const Error = () => {
  return (
    <div className="error-content">
      <p className="error-title">404</p>
      <p className="error-subtitle">
        Oups! La page que vous demandez n&apos;existe pas.
      </p>
      <NavLink to="/" className="error-text">
        Retourner sur la page d&apos;accueil
      </NavLink>
    </div>
  );
};

export default Error;
