import React from "react";
import "../App.css";
import ArticlesCards from "./ArticleCards";

export default function ArticleList(props) {
  const { searchResults } = props;

  return searchResults.map((article, index) => (
    <>
      <ArticlesCards article={article} index={index} />
    </>
  ));
}
