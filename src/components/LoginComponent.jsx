import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiUrl from "../../config/api";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Stockez les informations de l'utilisateur dans les cookies avec expiration
        Cookies.set("isAdmin", data.user.isAdmin);
        Cookies.set("token", data.token);

        // Utilisez navigate pour rediriger vers la page souhaitée après la connexion réussie
        navigate("/");
      } else {
        const data = await response.json();
        console.error("Login error:", data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginComponent;
