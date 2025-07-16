import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../redux/features/authSlice"; //  Import de l'action Redux pour la connexion
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/main.css";

// === Composant SignIn ===
function SignIn() {
  // --- États locaux ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // --- Hooks Redux & Navigation ---
  const [error, setError] = useState(""); //  Stocke les messages d'erreur
  const dispatch = useDispatch(); //  Permet d'envoyer des actions Redux
  const navigate = useNavigate(); //  Permet de naviguer entre les pages
  const { token } = useSelector((state) => state.auth);

  // --- Redirection si déjà connecté (token présent)---
  useEffect(() => {
    if (token) {
      navigate("/User");
    }
  }, [token, navigate]);

  // --- Soumission du formulaire de connexion ---
  const submitLoginForm = async (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();
    dispatch(UserLogin(formData))
      .unwrap()
      .then(() => {
        if (formData.rememberMe) {
          localStorage.setItem("userEmail", formData.email);
        } else {
          localStorage.removeItem("userEmail");
        }
        navigate("/User");
        console.log("Connexion Userpage");
      })
      .catch((err) => {
        console.error("Erreur de connexion :", err);
        setError(err);
      });
  };

  // --- Mise à jour des champs du formulaire ---
  const updateFormField = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // --- Rendu JSX ---
  return (
    <>
      <NavBar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={submitLoginForm}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={updateFormField}
                autoComplete="email"
                aria-label="Email"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={updateFormField}
                autoComplete="current-password"
                aria-label="Password"
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={updateFormField}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              {"Sign In"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;
