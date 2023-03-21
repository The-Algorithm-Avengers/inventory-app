import React from "react";

const Header = () => {
  return (
    <div className="navigationBar">
      <h2>InvetoryApp</h2>
      <header>
        <nav class="topnav" id="myTopnav">
            <a href="app.js">Home</a>
            <a href="">Create New Item Form</a>
            <a href="">Cart</a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
