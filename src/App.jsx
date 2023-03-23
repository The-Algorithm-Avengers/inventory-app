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

  // Gets all Items and sets it to items State
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


  // Deletes a single item by ID, reruns fetchItems and by setting showDetails to false stops rendering Details component
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

  // Fetches a single item from DB based on ID passed in && set that item to targetItem state && setting showDetails state to true to render Details component.
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

  // On start up run fetchItems ONCE.
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div>
        <main>
          
          {/* If showDetails is false */}
          {!showDetails ?
          <>
            {/* If showDetails is false && showForm is false */}
            {!showForm ? 
            
            <>
            <Header />
            <div className="buttonDiv">
              <button className="itemButton" onClick={() => setShowForm(!showForm)}>ADD ITEM</button>
              </div>
              <ItemsList items={items} getItem={getItem}/>
            </> :

            // If showDetails is false && showForm is true
            <CreateForm setShowForm={setShowForm} fetchItems={fetchItems}/>
            } 
          </> :

          <>
          {/* If showDetails is true */}
            {!editForm ?

              // if showDetails is true && editForm is false
              <Detail deleteItem={deleteItem} item={targetItem} setShowDetails={setShowDetails} setEditForm={setEditForm}/> :
              
              // if showDetails is true && editForm is true
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
