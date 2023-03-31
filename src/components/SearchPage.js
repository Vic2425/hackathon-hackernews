import React from 'react';
import {  useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
// import ArticlesCards from "./components/ArticleCards";
import ArticleList from "../components/ArticleList";

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState('');
  const [ year, setYear] = useState(0)

  useEffect(
    () => {
     const fetchData = async () => {
        const results = await axios(`https://hn.algolia.com/api/v1/search?query=${query}&tags=${tags}`)

       const object = results.data.hits.filter(result => {
          if(year === 0) {
            return result
          } else
          if ((Date.now() - year) < Date.parse(result.created_at)) {
            return result
          }
        })

        setSearchResults(object)
        
      }
      fetchData()
    }, [tags, query, year, searchResults]
  )
  const timeFiltered = (e) => {
    const milliseconds = e.target.value * 24 * 60 * 60 * 1000;
    setYear(milliseconds)
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
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <span>Settings</span>
      </div>
      <br />

      <div className="filtersCont">
        <div className="filterLabel">Search</div>
        <select onChange={(e) => {setTags(e.target.value)}}>
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
          <option value='0'>All Time</option>
          <option value='1'>Last 24h</option>
          <option value='7'>Past Week</option>
          <option value='30'>Past Month</option>
          <option value='365'>Past Year</option>
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
