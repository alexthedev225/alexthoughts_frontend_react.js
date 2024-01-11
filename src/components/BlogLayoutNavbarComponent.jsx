import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/BlogLayout.module.css"; // Assure-toi d'ajuster le chemin selon l'emplacement de ton fichier CSS module.

const BlogLayoutNavbarComponent = () => {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    navigate(selectedValue);
  };
  return (
    <>
      <nav className={styles.selectNavbarContainer}>
        <select className={styles.dropdownSelect} onChange={handleSelectChange}>
          <option value={""}>Tous les posts</option>
          <optgroup label="Catégories">
            <option value={"categories/philosophie"}>Philosophie</option>
            <option value={"categories/sport"}>Sport</option>
            <option value={"categories/technologie"}>Technologie</option>
          </optgroup>
        </select>
      </nav>
      <nav className={styles.navbarContainer}>
        <ul className={styles.navbarList}>
          <Link to={""} className={styles.navbarLink}>
            <li className={styles.navbarItem}>Tous les posts</li>
          </Link>
          <NavLink
            to={"categories/philosophie"}
            className={styles.navbarLink}
            style={({ isActive }) => {
              return {
                color: isActive && "blueviolet",
              };
            }}
          >
            <li className={styles.navbarItem}>Philosophie</li>
          </NavLink>
          <NavLink
            to={"categories/sport"}
            className={styles.navbarLink}
            style={({ isActive }) => {
              return {
                color: isActive && "blueviolet",
              };
            }}
          >
            <li className={styles.navbarItem}>Sport</li>
          </NavLink>
          <NavLink
            to={"categories/technologie"}
            className={styles.navbarLink}
            style={({ isActive }) => {
              return {
                color: isActive && "blueviolet",
              };
            }}
          >
            <li className={styles.navbarItem}>Technologie</li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default BlogLayoutNavbarComponent;
