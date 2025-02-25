// NavBar.jsx
import { useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, UserProfiles } from "../redux/features/authSlice";



const NavBar = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();  
  const profiles = useSelector((state) => state.auth.profiles);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    } else {
      console.log("useeffect token", storedToken);
       dispatch(UserProfiles(storedToken));
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    navigate("/");
  };

const handleLogoClick = () => {
  navigate("/");
};


const token = sessionStorage.getItem("token");


console.log("action Profiles", profiles);
return (
  <nav className="main-nav">
    <Link className="main-nav-logo" to="/" onClick={handleLogoClick}>
      <img
        className="main-nav-logo-image"
        src="/img/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
    <div>
      {/* Afficher le lien pour se connecter sur toutes les pages */}
      <div>
        <Link className="main-nav-item" to="/signin">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
      {/* Afficher le bouton de déconnexion uniquement sur la page /user */}
      {location.pathname === "/user" && token && (
        <div>
          {
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {profiles?.name}
            </Link>
          }
          <a className="main-nav-item" href="#" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      )}
    </div>
  </nav>
);
};

export default NavBar;


