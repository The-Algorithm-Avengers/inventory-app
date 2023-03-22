import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import Header from "./Header";
import Footer from "./Footer";

// import and prepend the api url to any fetch calls
import apiURL from "../../public2/react/api";

export const App = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();

      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${apiURL}/items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
      fetchItems()

    } catch (error) {
      console.log("Could not delete item" + error)
    }
    

  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <main>
        <Header />
        <h1>Items Store</h1>
        <h2>All things 🔥</h2>
        <ItemsList items={items} />
      </main>
      <Footer />
    </>
  );
};
