import React from "react";
import { Item } from "./Item";

const ItemsList = ({ items }) => {
  return (
    <div className="grid-container">
      {items.map((item, idx) => (
        <Item item={item} key={idx} />
      ))}
    </div>
  );
};

export default ItemsList;
