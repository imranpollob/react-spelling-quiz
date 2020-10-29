import React from "react";
const { REACT_APP_MY_ENV } = process.env;

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="text-center">Start a quiz or read the words</h1>
      <h2 className="text-center">Just click on the nav menu</h2>
      {REACT_APP_MY_ENV}
      <div className="home-image-container">
        <img
          src="https://i.pinimg.com/originals/6b/d5/94/6bd594a4264a8c01cb6da5c96789bcea.gif"
          alt="thinking spelling"
        />
      </div>
    </div>
  );
}
