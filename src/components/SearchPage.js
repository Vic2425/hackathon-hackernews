import React from "react";
// import {  useState, useEffect } from "react";
// import axios from "axios";
import "../App.css";

function SearchPage(props) {
  const { query, setQuery, setTags, timeFiltered } = props;

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
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <span>Settings</span>
      </div>
      <br />

      <div className="filtersCont">
        <div className="filterLabel">Search</div>
        <select
          onChange={(e) => {
            setTags(e.target.value);
          }}
        >
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
        <select onChange={timeFiltered}>
          <option value="0">All Time</option>
          <option value="365">Last Year</option>
          <option value="730">Last 2 Years</option>
          <option value="1095">Last 3 Years</option>
        </select>
      </div>
    </div>
  );
}

export default SearchPage;
