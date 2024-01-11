import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/CategorieArticleList.module.css"; // Assure-toi d'ajuster le chemin selon l'emplacement de ton fichier CSS module.
import fetchData from "../../utils/api";

const PhilosophieArticleListComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(); // Utilise la fonction fetchData sans spécifier l'URL ici
        setData(result);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  // Filtrer les articles par catégorie
  const filterByCategory = (category) => {
    return data.filter((article) => article.category === category);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fonction pour calculer le temps de lecture estimé
  const calculateReadTime = (content) => {
    if (content) {
      const textContent = content.replace(/<[^>]*>/g, "");
      const words = textContent.split(/\s+/);
      const wordsPerMinute = 200; // ajustez selon votre audience
      const readTimeInMinutes = words.length / wordsPerMinute;
      return Math.round(readTimeInMinutes);
    }
    return 0;
  };

  const renderImage = (article) => {
    if (article && article.image) {
      const imageBlob = new Blob([new Uint8Array(article.image.data)], {
        type: "image/jpeg",
      });
      const imageUrl = URL.createObjectURL(imageBlob);

      return (
        <img
          className={styles.articleImage}
          src={imageUrl}
          alt="article image"
        />
      );
    }
    return null;
  };
  
  return (
    <div className={styles.articleListContainer}>
      <ul className={styles.articleList}>
        {filterByCategory("Philosophie").map((article) => (
          <li key={article._id} className={styles.articleListItem}>
            <Link
              to={`/mon-blog/articles/${article._id}`}
              className={styles.articleLink}
            >
              {renderImage(article)}
              <div className={styles.articleInfoContainer}>
                <div className={styles.timeInfo}>
                  <p className={styles.date}>
                    {formatDate(article.publishedAt)}
                  </p>
                  <div className={styles.middleDot}></div>
                  <p className={styles.readTime}>
                    {calculateReadTime(article.content)} min de lecture
                  </p>
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.articleSubtitle}>{article.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhilosophieArticleListComponent;
