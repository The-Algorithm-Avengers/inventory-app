import React from "react";
import { Item } from "./Item";

const ItemsList = ({ items, getItem }) => {
	return (
		<div className="grid-container">
			{items.map((item, idx) => (
				<Item item={item} key={idx} getItem={getItem} />
			))}
		</div>
	);
};

export default ItemsList;
