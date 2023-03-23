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
		width: "300px",
		height: "300px",
		borderRadius: "10px",
		margin: "10px",
	};

	return (
		<div>
			<div style={itemStyle}></div>
			<h3 className="itemTitle" onClick={() => props.getItem(props.item.id)}>
				{props.item.title}
			</h3>
		</div>
	);
};
