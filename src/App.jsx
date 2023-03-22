import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemsList from "./components/ItemsList";
import apiURL from "./utils/api";
import { CreateForm } from "./components/CreateForm";
import {Detail} from "./components/Details"

const App = () => {
  const [items, setItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false)
  const [targetItem , setTargetItem] = useState({})

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

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${apiURL}/items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
      fetchItems()
      setShowDetails(false)

    } catch (error) {
      console.log("Could not delete item" + error)
    }
    
  }

  const getItem = async (id) => {
    try {
      const res = await fetch(`${apiURL}/items/${id}`)
      const data = await res.json()
      setTargetItem(data)
      setShowDetails(true)
    } catch (error) {
      console.log("Couldnt get item" + error)
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

          {!showDetails ?
          <>
            <h1>Items Store</h1>
            <h2>All things 🔥</h2>
            <ItemsList items={items} getItem={getItem}/>
            <CreateForm/>
          </> :

          <Detail deleteItem={deleteItem} item={targetItem} setShowDetails={setShowDetails}/>
        
        }

          
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
