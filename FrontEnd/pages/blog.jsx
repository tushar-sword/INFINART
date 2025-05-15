import React from "react";
import Navbar from "../src/components/Navbar/Navbar";
import BlogManager from "../src/components/Blog/BlogManager/BlogManager.jsx";
import Footersec from "../src/components/Footersection/Footersection.jsx";


const Blog = () => {
  return (
    <div>
      <Navbar />
      {/* <BlogForm /> */}
     <BlogManager />
      <Footersec />
      {/* <BlogList /> */}
    </div>
  );
};

export default Blog;
