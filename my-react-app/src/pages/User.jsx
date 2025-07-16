import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Account from "../components/Account";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserProfiles, UserUpdate } from "../redux/features/authslice.Js";
import "../styles/main.css";

// --- Composant User ---
function User() {
  // --- États & hooks principaux ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.auth.profiles);
  console.log("userprofil redux Récupéré", profiles); // Récupération du profil utilisateur dans le store redux
  const token = sessionStorage.getItem("token");
  const [username, setUsername] = useState(profiles?.userName || ""); // État pour le nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'affichage du formulaire

  // --- Vérification de la connexion & récupération du profil ---
  useEffect(() => {
    if (!token) {
      console.log("Utilisateur non connecté userpage");
      navigate("/signin");
    } else {
      console.log("Utilisateur connecté");
      dispatch(UserProfiles(token)); // Récupérer les informations de profil depuis l'API
    }
  }, [navigate, dispatch, token]);

  // --- Mise à jour du nom d'utilisateur local après récupération du profil ---
  useEffect(() => {
    if (profiles) {
      setUsername(profiles.userName);
    }
  }, [profiles]);

  // --- Soumission du formulaire de modification du nom d'utilisateur ---
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserUpdate({ token, userName: username }))
      .unwrap()
      .then((result) => {
        console.log("Mise à jour réussie", result);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour formulaire", error);
      });
    setIsEditing(false); // Fermer le formulaire après la mise à jour
  };

  // --- Données statiques des comptes ---
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  // --- Rendu JSX ---
  return (
    <>
      <NavBar />
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <h1>Edit User info</h1>
          ) : (
            <h1>
              Welcome back, {profiles?.firstName} {profiles?.lastName}!
            </h1>
          )}
          {isEditing ? (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-label-input__wrapper">
                <div className="form-label-input">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-label-input">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    value={profiles?.firstName || ""}
                    disabled
                  />
                </div>
                <div className="form-label-input">
                  <label htmlFor="username">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    value={profiles?.lastName || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button className="formbutton" type="submit">
                  Save
                </button>
                <button
                  className="formbutton"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account, index) => (
          <Account
            key={index}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default User;
