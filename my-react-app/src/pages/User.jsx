import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Account from '../components/Account';
import { useState, useEffect } from 'react'; 

import '../styles/main.css';


function User() {
  const [user, setUser] = useState(null); // L'état de l'utilisateur
  
  // Vérifier si un utilisateur est connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      setUser({ name: userEmail }); // Remplace par le nom réel de l'utilisateur si disponible
    }
  }, []);

  
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance"
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance"
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance"
    }
  ];

  return (
    <>
      <NavBar />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user ? user.name : 'Guest'}!</h1>
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