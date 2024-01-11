import { Link, NavLink } from "react-router-dom";
import styles from "../styles/NavbarComponent.module.css";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NavbarComponent = ({ onClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);

    // Ajoute ou supprime la classe 'no-scroll' au corps du document
    document.body.classList.toggle("no-scroll", !isMenuOpen);
  };

  useEffect(() => {
    // Nettoie la classe ajoutée lorsque le composant est démonté
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div className={styles.parentContainer}>
      <div className={styles.header}>
        <p className={styles.personalText}>
          TOUT EST PERSONNEL. Y COMPRIS CE BLOG.
        </p>
        <Link to={"/"}>
          <h1 className={styles.blogTitle}>Train de la pensée</h1>
        </Link>
      </div>

      <div
        className={`${styles["menu-items"]} ${
          isMenuOpen ? styles["show-menu"] : ""
        }`}
      >
        <div className={styles["link-container"]}>
          <NavLink
            to={"/"}
            id={styles.navLink}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={toggleMenu}
          >
            Accueil
          </NavLink>
          <NavLink
            to={"/à-propos"}
            id={styles.navLink}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={toggleMenu}
          >
            À propos
          </NavLink>
          <NavLink
            to={"/mon-blog"}
            id={styles.navLink}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={toggleMenu}
          >
            Mon blog
          </NavLink>
          <NavLink
            onClick={() => {
              onClick();
              toggleMenu();
            }}
          >
            Contact
          </NavLink>
        </div>
      </div>
      <div className={styles.navbarContainer}>
        <div className={styles.navigationLinks}>
          <NavLink
            to={"/"}
            id={styles.navLink}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Accueil
          </NavLink>
          <NavLink
            to={"/à-propos"}
            id={styles.navLink}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            À propos
          </NavLink>
          <NavLink
            to={"/mon-blog"}
            id={styles.navLink}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Mon blog
          </NavLink>
          <NavLink onClick={onClick} className={styles.contactLink}>
            Contact
          </NavLink>
        </div>
        <div className={styles.socialLinks}>
          <a href="/" className={styles.socialLink}>
            <img src={facebookLogo} alt="facebook" height={20} width={20} />
          </a>
          <a href="/" className={styles.socialLink}>
            <img src={instagramLogo} alt="instagram" height={16} width={16} />
          </a>
          <a href="/" className={styles.socialLink}>
            <img src={twitterLogo} alt="twitter" height={20} width={20} />
          </a>
        </div>
        <button
          className={`${styles["burger-menu-button"]} ${
            isMenuOpen ? styles.close : ""
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`${styles["burger-line"]} ${
              isMenuOpen ? styles.close : ""
            }`}
          ></div>
          <div
            className={`${styles["burger-line"]} ${
              isMenuOpen ? styles.close : ""
            }`}
          ></div>
          <div
            className={`${styles["burger-line"]} ${
              isMenuOpen ? styles.close : ""
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

NavbarComponent.propTypes = {
  onClick: PropTypes.func, // Définissez le type de la propriété onClick
  // Ajoutez d'autres propriétés avec leurs types
};
export default NavbarComponent;
