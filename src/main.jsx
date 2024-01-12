import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SignUpForm from "./components/SignUpForm.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import ArticleDetails from "./components/ArticleDetails.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import About from "./pages/About.jsx";
import Layout from "./Layout.jsx";
import Blog from "./pages/Blog/Index.jsx";
import TechnologyArticleListComponent from "./components/TechnologyArticleListComponent.jsx";
import PhilosophieArticleListComponent from "./components/PhilosophieArticleListComponent.jsx";
import SportArticleListComponent from "./components/SportArticleListComponent.jsx";
import BlogLayout from "./pages/Blog/Layout.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inscription" element={<SignUpForm />} />
        <Route path="/connexion" element={<LoginComponent />} />
        <Route path="/article/create" element={<CreateArticle />} />
        <Route path="/à-propos" element={<About />} />
        <Route path="/mon-blog/*" element={<BlogLayout />}>
          <Route index element={<Blog />} />
          <Route
            path="categories/technologie"
            element={<TechnologyArticleListComponent />}
          />
          <Route
            path="categories/philosophie"
            element={<PhilosophieArticleListComponent />}
          />
          <Route
            path="categories/sport"
            element={<SportArticleListComponent />}
          />
          <Route path="articles/:id" element={<ArticleDetails />} />
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
  </QueryClientProvider>
);
