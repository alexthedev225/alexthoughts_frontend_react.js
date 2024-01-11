import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprime les cookies associés à la session utilisateur
    Cookies.remove("token");
    Cookies.remove("user.isAdmin");

    // Redirige l'utilisateur vers la page de connexion après la déconnexion
    navigate("/connexion");
  };

  return (
    <div>
      <h2>Déconnexion</h2>
      <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default LogoutComponent;
