import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchPage from "./SearchPage";
import ArticleList from "./ArticleList";
import "../App.css";

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("");
  const [year, setYear] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=${tags}`
      );

      const object = results.data.hits.filter((result) => {
        if (year === 0) {
          return result;
        } else if (Date.now() - year < Date.parse(result.created_at)) {
          return result;
        }
      });

      setSearchResults(object);
    };
    fetchData();
  }, [tags, query, year, searchResults]);
  
  const timeFiltered = (e) => {
    const milliseconds = e.target.value * 24 * 60 * 60 * 1000;
    setYear(milliseconds);
  };

  return (
    <>
      <SearchPage
        onChange={timeFiltered}
        query={query}
        setQuery={setQuery}
        setTags={setTags}
      />
      <ArticleList searchResults={searchResults} />
    </>
  );
}

export default SearchBar;
