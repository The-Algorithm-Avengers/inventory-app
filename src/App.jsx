import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemsList from "./components/ItemsList";
import apiURL from "./utils/api";
import { CreateForm } from "./components/CreateForm";
import {Detail} from "./components/Details"
import { UpdateForm } from "./components/UpdateForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false)
  const [targetItem , setTargetItem] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [editForm, setEditForm] = useState(false)

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
      console.log('hi')
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
            {!showForm ? 
            <>
              <h1>Items Store</h1>
              <h2>All things 🔥</h2>
              <button onClick={() => setShowForm(!showForm)}>Add Item</button>
              <ItemsList items={items} getItem={getItem}/>
            </> :
            <CreateForm setShowForm={setShowForm} fetchItems={fetchItems}/>
            } 
          </> :

          <>
            {!editForm ?
              <Detail deleteItem={deleteItem} item={targetItem} setShowDetails={setShowDetails} setEditForm={setEditForm}/> :
              <UpdateForm item={targetItem} setEditForm={setEditForm} fetchItems={fetchItems} setShowDetails={setShowDetails}/>

            }
          
          </>
            
          
        
        }

          
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
