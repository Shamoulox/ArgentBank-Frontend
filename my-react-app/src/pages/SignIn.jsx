import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../redux/features/authSlice"; //  Import de l'action Redux pour la connexion
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/main.css";


function SignIn() {
  //  useState pour stocker les valeurs du formulaire (email, mot de passe, rememberMe)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  // --------------------------------------Redux--------------------------------------
  const [error, setError] = useState(""); //  Stocke les messages d'erreur
  const dispatch = useDispatch(); //  Permet d'envoyer des actions Redux
  const navigate = useNavigate(); //  Permet la redirection après connexion

  // Récupération des états Redux : , error (message d'erreur), token
  const { token } = useSelector((state) => state.auth);

  // redirigé l'utilisateur vers la page User s'il est déjà connecté si un token est present
   useEffect(() => {
    if (token) {
      navigate("/User");
    }
     }, [token, navigate]);


  //  Fonction appelée lors du clic sur "Sign In"
  const submitLoginForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    dispatch(UserLogin(formData)) // Envoie de l'action Userlogin Redux pour l'authentification
      .unwrap() //  convertit la réponse en promesse JS
      .then(() => {
        // Stockage de l'email si "Remember me" est coché
        if (formData.rememberMe) {
          localStorage.setItem("userEmail", formData.email);
        } else {
          localStorage.removeItem("userEmail");
        }
        navigate("/User"); //  Redirection vers la page user après connexion réussie
        console.log("Connexion Userpage");
      })
      .catch((err) => {
        console.error("Erreur de connexion :", err); // Afficher erreur si l'authentification échoue
       setError(err); // Stocker le message d'erreur dans le state
      });
  };

  // Met à jour les valeurs du formulaire à chaque modification d'un champ en copiant les valeurs précédentes.
  const updateFormField = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

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
