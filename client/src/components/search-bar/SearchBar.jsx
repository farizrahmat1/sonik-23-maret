import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./searchbar.css"

const SearchBar = (props) => {
  return (
    <div>
      <div className="wrapper">
        <SearchOutlinedIcon />
        <input {...props} />
      </div>
    </div>
  );
};

export default SearchBar;
