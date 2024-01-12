import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ArticleRecentComponent.module.css";
import apiUrl from "../../config/api";

const ArticleRecentComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données en cache
        const cachedData = localStorage.getItem("cachedData");
        let cachedDataParsed = [];
  
        if (cachedData) {
          cachedDataParsed = JSON.parse(cachedData);
        }
  
        // Vérifier si les données en cache sont obsolètes
        const isCacheObsolete =
          cachedDataParsed.length > 0 &&
          new Date() - new Date(cachedDataParsed[0].publishedAt) < cacheTime;
  
        // Utiliser les données en cache si elles ne sont pas obsolètes
        if (isCacheObsolete) {
          setData(cachedDataParsed[0]);
          console.log("Données récupérées depuis le cache");
        } else {
          // Récupérer les nouvelles données depuis l'API
          const response = await fetch(`${apiUrl}/api/articles`, {
            cache: "no-store" // Éviter la mise en cache du navigateur
          });
          const result = await response.json();
  
          // Trier les nouvelles données par date de publication
          const sortedData = result.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
  
          // Mettre à jour le cache avec les nouvelles données
          localStorage.setItem("cachedData", JSON.stringify(sortedData));
  
          // Mettre à jour l'état avec les nouvelles données
          setData(sortedData[0]);
          console.log("Nouvelles données récupérées depuis l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
  
    const cacheTime = 60 * 1000; // Temps en millisecondes avant de considérer le cache comme obsolète (1 minute)
  
    fetchData();
  }, []);
  

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
