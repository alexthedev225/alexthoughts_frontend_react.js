import { useState } from "react";
import axios from "axios";
import styles from "../styles/CreateArticle.module.css";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../config/api";
// import apiUrl from "../../config/api";

const CreateArticle = () => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
    subtitle: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la catégorie
    if (articleData.category === "") {
      alert("Veuillez sélectionner une catégorie.");
      return;
    }
    console.log("categorie " + articleData.category);
    // Envoi de la requête POST
    const formDataWithImage = new FormData();
    formDataWithImage.append("title", articleData.title);
    formDataWithImage.append("subtitle", articleData.subtitle);
    formDataWithImage.append("content", articleData.content);
    formDataWithImage.append("category", articleData.category);
    formDataWithImage.append("image", image);

    try {
      await axios.post(`${apiUrl}/api/articles`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création de l'article :", error);
    }
  };

  return (
    <div className={styles.createArticleContainer}>
      <h2>Créer un article</h2>
      <form className={styles.articleForm} onSubmit={handleSubmit}>
        <label className={styles.articleLabel}>
          Titre:
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            className={styles.articleInput}
          />
        </label>
        <label className={styles.articleLabel}>
          Sous Titre:
          <input
            type="text"
            name="subtitle"
            value={articleData.subtitle}
            onChange={handleChange}
            className={styles.articleInput}
          />
        </label>
        <label className={styles.articleLabel}>
          Contenu:
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleChange}
            className={styles.articleTextarea}
          />
        </label>
        <label className={styles.articleLabel}>
          Catégorie:
          <select
            name="category"
            onChange={handleChange}
            className={styles.articleSelect}
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Sport">Sport</option>
            <option value="Philosophie">Philosophie</option>
            <option value="Technologie">Technologie</option>
          </select>
        </label>
        <label className={styles.articleLabel}>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.articleFileInput}
          />
        </label>
        <button type="submit" className={styles.articleSubmitButton}>
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
