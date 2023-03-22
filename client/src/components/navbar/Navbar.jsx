import "./navbar.scss";
import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <img
              src="
              https://upload.wikimedia.org/wikipedia/commons/d/dd/Alt_Logo_BRIN.png"
              alt="logo"
              className="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
