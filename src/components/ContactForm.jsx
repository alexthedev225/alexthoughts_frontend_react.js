import { useState, forwardRef } from "react";
import flecheHaut from "../assets/fleche-haut.png";
import styles from "../styles/ContactForm.module.css";
import apiUrl from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const ContactForm = forwardRef(function ContactForm(props, ref) {
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true); // Active le spinner

      const response = await fetch(`${apiUrl}/api/contact/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("E-mail envoyé avec succès !");
        setSubmitStatus("success");
      } else {
        console.error(
          "Erreur lors de l'envoi de l'e-mail :",
          response.statusText
        );
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false); // Désactive le spinner
      setModalVisible(true);
      document.body.classList.add("modal-open");
      setTimeout(() => {
        setModalVisible(false);
        document.body.classList.remove("modal-open");
        resetForm(); // Appelle la fonction pour réinitialiser le formulaire
      }, 3000);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.contactFormContainer} ref={ref}>
      <img
        src={flecheHaut}
        alt={flecheHaut}
        className={styles.scrollToTopButton}
        onClick={handleScrollToTop}
      />
      <h1 className={styles.formTitle}>
        Écris moi un message pour me donner ton avis
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.additionalSection}>
          <label className={styles.formLabel}>
            <p>Nom</p>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={styles.formInput}
            />
          </label>
          <label className={styles.formLabel}>
            <p>Prénom</p>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={styles.formInput}
            />
          </label>
        </div>
        <label className={styles.formLabel}>
          <p>E-mail *</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          <p>Message...</p>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.formTextarea}
          />
        </label>
        <button type="submit" className={styles.formButton}>
          {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : "Envoyer"}
        </button>
      </form>

      {modalVisible && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            {submitStatus === "success" && (
              <>
                
                <p className={styles.successMessage}>
                  E-mail envoyé avec succès !
                </p>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="3x"
                  color="#4caf50"
                />
              </>
            )}

            {submitStatus === "error" && (
              <>
               
                <p className={styles.errorMessage}>
                  Erreur lors de l&apos;envoi de l&apos;e-mail. Veuillez réessayer.
                </p>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size="3x"
                  color="#f44336"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default ContactForm;
