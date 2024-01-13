import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="text-center">
        Are you ready to test your spelling skills?
      </h1>
      <h2 className="text-center">
        Just click <Link to="/quiz">HERE</Link>
      </h2>
      <div className="home-image-container">
        <img
          src="https://i.pinimg.com/originals/6b/d5/94/6bd594a4264a8c01cb6da5c96789bcea.gif"
          alt="thinking spelling"
        />
      </div>
    </div>
  );
}
