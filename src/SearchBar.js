import { React, useState } from "react";
import axios from "axios";
import "./App.css";
// import ArticlesCards from "./components/ArticleCards";
import ArticleList from "./components/ArticleList";

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    // console.log(e.target.value);

    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${e.target.value}`)
      .then((result) => {
        console.log("result", result.data.hits);
        setSearchResults(result.data.hits);
      });
  };

  return (
    <div className="mainCont">
      <div className="navBar">
        <img
          src="https://hn.algolia.com/packs/media/images/logo-hn-search-a822432b.png"
          alt="HN logo"
        />
        <div className="searchLabel">
          Search <br /> Hack News
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="search stories by title, url or author"
            autoComplete="off"
            className="searchInput"
            onChange={handleChange}
          />
        </div>
        <span>Settings</span>
      </div>
      <br />

      <div className="filtersCont">
        <div className="filterLabel">Search</div>
        <select>
          <option value="">All</option>
          <option value="story">Stories</option>
          <option value="comment">Comments</option>
        </select>
        <div className="filterLabel">by</div>

        <select>
          <option value="popularity">Popularity</option>
          <option value="date">Date</option>
        </select>

        <div className="filterLabel">for </div>
        <select>
          <option>All Time</option>
          <option>Last 24h</option>
          <option>Past Week</option>
          <option>Past Month</option>
          <option>Past Year</option>
        </select>
      </div>
      <div>
        {searchResults.map((article, index) => (
          <ArticleList article={article} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
