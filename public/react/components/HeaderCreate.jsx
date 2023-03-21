import React from "react";

const CreateNav = () => {
  const handleBackButton = () => {
    console.log("go back");
  };

  return (
    <div>
      <button onClick={handleBackButton}>Back to Invetory</button>
      <h2>InvetoryApp</h2>
    </div>
  );
};

export default CreateNav;
