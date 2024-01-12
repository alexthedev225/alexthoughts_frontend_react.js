import styles from "../styles/About.module.css";
import profilImage from "../assets/alex-avatar.jpeg";
import LazyLoad from "react-lazyload";

const About = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.profilContainer}>
        <LazyLoad className={styles.profilImageContainer}>
          <img
            src={profilImage}
            alt={profilImage}
            className={styles.profilImage}
          />
        </LazyLoad>
        <div className={styles.profilInfo}>
          <h1>Salut ! Ravi de te rencontrer.</h1>
          <p>
            Bonjour à tous et bienvenue sur mon blog ! Je suis ravi de partager
            avec vous ma passion pour la technologie, le sport et la
            philosophie. <br />
            <br /> En tant que développeur Full Stack, je plonge avec
            enthousiasme dans l&apos;écosystème MERN, explorant des technologies
            telles que JavaScript, React.js, Next.js, Node.js, Express.js,
            MongoDB, MySQL et PHP. Mes articles vous emmèneront dans le monde
            fascinant du développement web, où je partage des découvertes, des
            astuces et des réflexions.
            <br />
            <br /> En parallèle, je suis un fervent amateur de sport, notamment
            de fitness, musculation et basket-ball. Rejoignez-moi pour des
            discussions animées sur les dernières tendances, les entraînements
            efficaces et l&apos;importance du bien-être physique.
            <br />
            <br /> Enfin, plongeons ensemble dans le monde de la philosophie.
            Explorez avec moi des réflexions profondes sur la vie, la
            connaissance et l&apos;existence. Ma quête de compréhension
            m&apos;inspire à partager des idées philosophiques et à explorer les
            mystères qui entourent notre existence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
