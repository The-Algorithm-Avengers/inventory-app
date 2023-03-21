import React, { useState } from 'react';
import apiURL from '../api';

export function AddPage(props) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    tags: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${apiURL}/wiki/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        name: formData.authorName,
        email: formData.authorEmail,
        tags: formData.tags,
      }),
    });
    const data = await response.json();
    props.onArticleAdded();
    props.onClose();
    setFormData({
      title: '',
      content: '',
      authorName: '',
      authorEmail: '',
      tags: '',
    });
  };
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    < div class='add-article-form'>
    <h2>Add a Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Article Content"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Author Name"
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Author Email"
            type="email"
            id="authorEmail"
            name="authorEmail"
            value={formData.authorEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Tags"
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Page</button>
      </form>
    </div>
  );
}