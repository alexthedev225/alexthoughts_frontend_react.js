import apiUrl from "../config/api";

// api.js
const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/articles`, {
        cache: "force-cache"
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      throw error; // Propage l'erreur pour la gestion des erreurs ailleurs si nécessaire
    }
  };
  
  export default fetchData;
  