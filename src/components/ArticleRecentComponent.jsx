import { Link } from "react-router-dom";
import styles from "../styles/ArticleRecentComponent.module.css";
import apiUrl from "../../config/api";
import { useQuery } from 'react-query';


const fetchRecentArticle = async () => {
  const response = await fetch(`${apiUrl}/api/articles`);
  const result = await response.json();
  return result[result.length - 1]; // Utilise result.length - 1 pour obtenir le dernier article

};

const ArticleRecentComponent = () => {
  const { data, isLoading, isError } = useQuery('recentArticle', fetchRecentArticle);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Erreur lors de la récupération des données</p>;
  }

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
  const renderImage = (article) => {
    if (article && article.image) {
      const imageBlob = new Blob([new Uint8Array(article.image.data)], {
        type: "image/jpeg",
      });
      const imageUrl = URL.createObjectURL(imageBlob);

      return (
        <img
          className={styles.image}
          src={imageUrl}
          alt="article image"
        />
      );
    }
    return null;
    
  };
  // ...
  return (
    <div className={styles.articleContainer}>
      {Array.isArray(data) && data.length === 0 ? (
        <p>Chargement ...</p>
      ) : (
        <>
          {data && (
            <>
              <div className={styles.postLabel}>
                <p>POST À L&apos;AFFICHE</p>
              </div>
              <div className={styles.article}>
                <Link
                  to={`/mon-blog/articles/${data._id}`}
                  className={styles.link}
                >
                  {renderImage(data)}
                  <div className={styles.content}>
                    <div className={styles.timeInfo}>
                      <p className={styles.date}>
                        {formatDate(data.publishedAt)}
                      </p>
                      <div className={styles.middleDot}></div>
                      <p className={styles.readTime}>
                        {calculateReadTime(data.content)} min
                      </p>
                    </div>
                    <h2 className={styles.title}>{data.title}</h2>
                    <p className={styles.subtitle}>{data.subtitle}</p>
                  </div>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
  // ...
};

export default ArticleRecentComponent;
