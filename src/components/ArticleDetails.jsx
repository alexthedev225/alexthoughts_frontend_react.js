import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ArticleDetails.module.css";
import apiUrl from "../../config/api";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/articles/${id}`, {
          cache: "force-cache"
        });
        const data = await response.json();
        console.log(data.article);

        setArticle(data.article);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'article :",
          error
        );
      }
    };

    fetchArticleDetails();
  }, [id]);
  // Fonction pour formater la date
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

  // Fonction pour transformer les éléments se terminant par ":" en h3

  const transformToHeading = (content) => {
    if (content) {
      const transformedContent = content.replace(
        /([^\n]*:\s*)/g,
        "<h3>$1</h3>"
      );
      return (
        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: transformedContent }}
        ></div>
      );
    }
    return null;
  };

  const renderImage = () => {
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
    <div className={styles.articleDetailsContainer}>
      {article ? (
        <div>
          <div className={styles.timeInfo}>
            <p className={styles.date}>{formatDate(article.publishedAt)}</p>
            <div className={styles.middleDot}></div>
            <p className={styles.readTime}>
              {calculateReadTime(article.content)} min de lecture
            </p>
          </div>
          <p className={styles.articleTitle}>{article.title}</p>
          <p className={styles.articleSubtitle}>{article.subtitle}</p>
          {renderImage()}

          <div className={styles.articleContent}>
            {" "}
            {transformToHeading(article.content)}
          </div>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
};

export default ArticleDetails;
