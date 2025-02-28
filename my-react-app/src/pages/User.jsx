import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Account from "../components/Account";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserProfiles } from "../redux/features/authslice.Js";

import "../styles/main.css";

function User() {
  const navigate = useNavigate(); // redirection après connexion
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.auth.profiles);
  console.log("userprofil redux Récupéré", profiles); // Récupération du profil utilisateur dans le store redux

  // Vérifier si un utilisateur est connecté au chargement
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Récupérer le token dans le sessionStorage
    if (!token) {
      console.log("Utilisateur non connecté userpage");
      navigate("/signin"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    } else {
      console.log("Utilisateur connecté");
      dispatch(UserProfiles(token));
    }
  }, [navigate, dispatch]);

  // Fonction pour gérer la déconnexion
  // const handleLogout = () => {
  //   dispatch(logout()); // Déclenche l'action logout redux
  //   navigate("/signin"); // Redirige vers la page de connexion
  // };

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
          {/* Ajout du bouton du nom utilisteur */}
          <h1>
            Welcome back, {profiles?.firstName} {profiles?.lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
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
