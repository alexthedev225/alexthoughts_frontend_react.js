// CreateArticleButton.jsx
import { Link } from "react-router-dom";
import styles from "../styles/CreateArticleButton.module.css"; // Importez le module CSS

const CreateArticleButton = () => {
  return (
    <div className={styles.createArticleButton}>
      <Link to="/article/create" className={styles.buttonLink}>
        Créer un nouvel article
      </Link>
    </div>
  );
};

export default CreateArticleButton;
