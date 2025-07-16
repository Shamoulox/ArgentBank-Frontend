// NavBar.jsx
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, UserProfiles } from "../redux/features/authSlice";

// // --- Hooks & Sélecteurs Redux ---
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.auth.profiles);

  // --- Gestion de l'authentification et récupération du profil utilisateur ---
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken && location.pathname !== "/") {
      navigate("/signin");
    } else if (storedToken) {
      console.log("useeffect token", storedToken);
      dispatch(UserProfiles(storedToken));
    }
  }, [dispatch, navigate, location.pathname]);

  // --- Déconnexion ---
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // --- Navigation via le logo ---
  const handleLogoClick = () => {
    navigate("/");
  };

  // --- Vérification de la connexion ---
  const isLoggedIn = !!sessionStorage.getItem("token");

  // --- Rendu Jsx ---
  console.log("action Profiles", profiles);
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/" onClick={handleLogoClick}>
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Afficher le nom de l'utilisateur si connecté */}
        {isLoggedIn ? (
          <div>
            {profiles && profiles.userName && (
              <Link className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                {profiles.userName}
              </Link>
            )}
            <a className="main-nav-item" href="#" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
          // Afficher le lien pour se connecter si l'utilisateur n'est pas connecté
          <div>
            <Link className="main-nav-item" to="/signin">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
