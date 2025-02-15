// NavBar.jsx
import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, UserProfiles } from "../redux/features/authSlice";


const NavBar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const profiles = useSelector((state) => state.auth.profiles);

  useEffect(() => {
    if (token) dispatch(UserProfiles(token));
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    navigate("/");
  };
console.log("action Profiles", profiles)
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {profiles && profiles.name ? (
          <>
            {/* Afficher le nom de l'utilisateur et le bouton de déconnexion */}
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {profiles?.name}
            </Link>
            {/**afficher le bouton de déconnection si l'utilisateur est connecté */}
            <Link className="main-nav-item" href="/home" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          // Si l'utilisateur n'est pas connecté, afficher le lien pour se connecter
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
      
    </nav>
  );
};

export default NavBar;
