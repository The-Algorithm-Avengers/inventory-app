import React from "react";

export const Item = (props) => {
  const itemStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${props.item.image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "300px", // Adjust the width and height as needed
    height: "300px",
    borderRadius: "10px",
    margin: "10px",
  };

  return (
    <div style={itemStyle}>
      <h3>{props.item.name}</h3>
    </div>
  );
};
