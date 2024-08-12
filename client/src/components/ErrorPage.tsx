
import React from "react";
import "./ErrorPage.css";

function ErrorPage(): JSX.Element {
  return (
    <div className="error-page-container">
      <div className="error-page-starfield"></div>
      <h1>Упс, такой страницы не существует</h1>
    </div>
  );
}

export default ErrorPage;
