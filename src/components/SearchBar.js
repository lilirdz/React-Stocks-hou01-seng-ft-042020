import React from "react";

const SearchBar = (props) => {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          checked={props.sort === "Alphabetically"}
          onChange={(e) => props.sortBy(e.target.value)}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          checked={props.sort === "Price"}
          onChange={(e) => props.sortBy(e.target.value)}
        />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select
          value={props.filter}
          onChange={(e) => props.filterBy(e.target.value)}
        >
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
