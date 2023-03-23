import React from "react";

export const Detail = (props) => {
	return (
		<div>
			<div className="flex">
				<img src={props.item.image} alt="" />
				<div className="flex-col">
					<h3>{props.item.title}</h3>
					<p>
						<span>Price:</span> {props.item.price}
					</p>
					<p>
						<span>Category: </span>
						{props.item.category}
					</p>

					<p>
						<span>Summary: </span>
						{props.item.description}
					</p>
				</div>
			</div>

			<div className="button" style={{ padding: "20px" }}>
				<button
					className="itemButton"
					onClick={() => props.deleteItem(props.item.id)}
				>
					Delete
				</button>
				<button className="itemButton" onClick={() => props.setEditForm(true)}>
					Edit
				</button>
				<button
					className="itemButton"
					onClick={() => props.setShowDetails(false)}
				>
					Go Back
				</button>
			</div>
		</div>
	);
};
