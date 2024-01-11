import { useState, useEffect } from "react";
import io from "socket.io-client";
import apiUrl from "../../config/api";
import PropTypes from "prop-types";
import { useCallback } from "react";

const CommentComponent = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  // Fonction pour récupérer les commentaires du serveur
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/articles/${articleId}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  }, [articleId]);

  useEffect(() => {
    const socket = io(apiUrl, { withCredentials: true });

    // Écoute les événements 'newComment' pour mettre à jour les commentaires en temps réel
    socket.on("newComment", (data) => {
      if (data.articleId === articleId) {
        // Concaténer le nouveau commentaire à la liste existante
        setComments((prevComments) => [...prevComments, data.newComment]);
      }
    });

    // Récupère les commentaires existants lors de l'initialisation
    fetchComments();

    return () => {
      socket.disconnect(); // Déconnexion du socket lors du démontage du composant
    };
  }, [articleId, fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/api/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      const data = await response.json();

      // Mettre à jour la liste des commentaires uniquement si un nouveau commentaire a été ajouté
      if (data.newComment) {
        setComments((prevComments) => [...prevComments, data.newComment]);
      }

      // Réinitialiser le formulaire des commentaires
      setNewComment({ author: "", content: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <div>
      <h2>Commentaires</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong>: {comment.content}
          </li>
        ))}
      </ul>

      {/* Formulaire pour ajouter un commentaire */}
      <form onSubmit={handleCommentSubmit}>
        <label>
          Nom:
          <input
            type="text"
            value={newComment.author}
            onChange={(e) =>
              setNewComment({ ...newComment, author: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Commentaire:
          <textarea
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Ajouter un commentaire</button>
      </form>
    </div>
  );
};

CommentComponent.propTypes = {
  articleId: PropTypes.any, // Utilise le type approprié pour articleId
  // Ajoute d'autres propTypes si nécessaire
};
export default CommentComponent;
