import React, { useState } from "react";
import apiURL from "../utils/api";

export function UpdateForm(props) {
	const [formData, setFormData] = useState(props.item);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`${apiURL}/items/${props.item.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		await response.json();
		props.setEditForm(false);
		props.setShowDetails(false);
		props.fetchItems();
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="create-form">
			<h2>Edit an Item</h2>
			<form onSubmit={handleSubmit}>
				<div className="formContent">
					<input
						placeholder="Title"
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="formContent">
					<input
						placeholder="Price"
						name="price"
						value={formData.price}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="formContent">
					<input
						placeholder="Description"
						type="text"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="formContent">
					<input
						placeholder="Category"
						type="text"
						name="category"
						value={formData.category}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="button">
					<button className="itemButton" type="submit">
						Save Item
					</button>
					<button
						className="itemButton"
						onClick={() => props.setEditForm(false)}
					>
						Back to Details
					</button>
				</div>
			</form>
		</div>
	);
}
