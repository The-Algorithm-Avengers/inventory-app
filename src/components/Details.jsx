import React from "react";

export const Detail = (props) => {

  return (
    <div>
        <div className="flex">
            <img src={props.item.image} alt="" />
            <p>{props.item.description}</p>
        </div>
        
        <div className="flex">
            <button onClick={() => props.deleteItem(props.item.id)}>Delete</button>
            <button>Edit</button>
            <button onClick={() => props.setShowDetails(false)}>Go Back</button>
        </div>

    </div>
  );
};