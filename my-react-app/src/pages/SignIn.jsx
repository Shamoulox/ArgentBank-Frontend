
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/main.css';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      console.log('réponse API: ', data);

      if (response.ok) {
        // Stocker le token dans le localStorage
        console.log('connexion réussie token', data.body.token);
        localStorage.setItem('token', data.body.token);
        localStorage.setItem('userName', data.body.userName); 
        // S'Assurez- le nom de l'utilisateur est disponible dans la réponse

        // Stocker l'email si "Remember me" est coché
        if (formData.rememberMe) {
          localStorage.setItem('userEmail', formData.email);
        } else {
          localStorage.removeItem('userEmail');
        }
        
        // Redirection vers la page user
        navigate('/user');
      } else {
        setError(data.message || 'Erreur pendant la connexion');
      }
      } catch (error) {
        console.error(error);
        setError('Les identifiants sont incorrects');
    }
  }

  const updateFormField = (e) => {
    const { id, value, type, checked } = e.target;
    console.log(checked, id)
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  
console.log('formData', formData)
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
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={updateFormField}
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
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;