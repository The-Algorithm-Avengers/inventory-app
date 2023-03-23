import React, { useState } from "react";
import apiURL from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function CreateForm({ setShowForm, fetchItems }) {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${apiURL}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setFormData({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    });
    setShowForm(!setShowForm);
    fetchItems();
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
      <h2>Add a New Item</h2>
      <form className="form-create" onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            placeholder="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Decription"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            placeholder="Category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            placeholder="Image URL"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <button className="submit-button" type="submit">
          Create Item
        </button>
        <button
          className="go-back-button"
          onClick={() => setShowForm(!setShowForm)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </form>
    </div>
  );
}
