import React from "react";
import "../App.css";

const moment = require("moment");

export default function ArticleList(props) {
  const { article, index } = props;
  let date = moment(article.created_at).format("MM-DD-YYYY");
 
  return (
    <div className="storyData">
      <div key={index} className="storyTitle">
        <a href={article.url} target="_blank">
          <span>{article.title}</span>
        </a>
        <a href={article.url} className="storyLink">
          ({article.url})
        </a>
      </div>
      <div className="storyMeta">
        <span>{article.points} points </span>
        <span className="spanSep">|</span>
        <span>{article.author} </span>
        <span className="spanSep">|</span>
        <span>{date} </span>
        <span className="spanSep">|</span>
        <span>{article.num_comments} comments </span>
      </div>
    </div>
  );
}
