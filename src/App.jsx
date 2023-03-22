import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemsList from "./components/ItemsList";
import apiURL from "./utils/api";

const App = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const itemsData = await response.json();
      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div>
        <main>
          <Header />
          <h1>Items Store</h1>
          <h2>All things 🔥</h2>
          <ItemsList items={items} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
