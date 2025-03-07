import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Account from "../components/Account";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserProfiles, UserUpdate } from "../redux/features/authslice.Js";

import "../styles/main.css";

function User() {
  const navigate = useNavigate(); // redirection après connexion
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.auth.profiles);
  console.log("userprofil redux Récupéré", profiles); // Récupération du profil utilisateur dans le store redux

  const [username, setUsername] = useState(profiles?.userName || ""); // État pour le nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'affichage du formulaire

  // Vérifier si un utilisateur est connecté au chargement
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Récupérer le token dans le sessionStorage
    if (!token) {
      console.log("Utilisateur non connecté userpage");
      navigate("/signin"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    } else {
      console.log("Utilisateur connecté");
      dispatch(UserProfiles(token)); // Récupérer les informations de profil depuis l'API
    }
  }, [navigate, dispatch]);

  // Mettre à jour l'état du nom d'utilisateur lorsque le profil est récupéré
  useEffect(() => {
    if (profiles) {
      setUsername(profiles.userName);
    }
  }, [profiles]);

 // Gérer la soumission du formulaire de mise à jour du nom d'utilisateur
 const handleSubmit = (e) => {
  e.preventDefault();
  const token = sessionStorage.getItem("token");
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

  return (
    <>
      <NavBar />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back, {profiles?.firstName} {profiles?.lastName}!
          </h1>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
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