import React, { useState } from 'react';
import apiURL from '../utils/api';

export function CreateForm({setShowForm, fetchItems}) {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${apiURL}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setFormData({
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
    });
    setShowForm(!setShowForm)
    fetchItems()
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    < div className='create-form'>
    <h2>Add a New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className='formContent'>
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='formContent'>
          <input
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='formContent'>
          <input
            placeholder="Decription"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className='formContent'>
          <input
            placeholder="Category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className='formContent'>
          <input
            placeholder="Image"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className='button'>
        <button className='itemButton' type="submit">Create Item</button>
        <button className='itemButton' onClick={() => setShowForm(!setShowForm)}>Home Page</button>
        </div>
      </form>
    </div>
  );
}

