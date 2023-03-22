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

      <div className="flex">
        <button onClick={() => props.deleteItem(props.item.id)}>Delete</button>
        <button onClick={() => props.setEditForm(true)}>Edit</button>
        <button onClick={() => props.setShowDetails(false)}>Go Back</button>
      </div>
    </div>
  );
};
