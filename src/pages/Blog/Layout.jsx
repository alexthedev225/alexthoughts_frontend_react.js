import PropTypes from "prop-types";
import BlogLayoutNavbarComponent from "../../components/BlogLayoutNavbarComponent";
import { Outlet } from "react-router-dom";

const BlogLayout = ({ children }) => {
  return (
    <>
      <BlogLayoutNavbarComponent />
      {children}
      <Outlet />
    </>
  );
};

BlogLayout.propTypes = {
  children: PropTypes.node,
};
export default BlogLayout;
