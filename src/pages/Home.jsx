import ArticleRecentComponent from "../components/ArticleRecentComponent";
import Cookies from "js-cookie";
import CreateArticleButton from "../components/CreateArticleButton";
// import { Link } from "react-router-dom";

const Home = () => {
  const { token: isAuthenticated, isAdmin } = Cookies.get();

  return (
    <>
      {/* <Link to={'/inscription'}>Inscription</Link>
      <Link to={'/connexion'}>Connexion</Link> */}
      {isAuthenticated && isAdmin && <CreateArticleButton />}
      <ArticleRecentComponent />
    </>
  );
};

export default Home;
