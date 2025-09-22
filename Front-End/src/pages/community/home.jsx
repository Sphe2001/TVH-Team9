import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
