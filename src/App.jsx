import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemsList from "./components/ItemsList";
import apiURL from "./utils/api";
import { CreateForm } from "./components/CreateForm";
import { Detail } from "./components/Details";
import { UpdateForm } from "./components/UpdateForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [targetItem, setTargetItem] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");

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
      await fetch(`${apiURL}/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchItems();
      setShowDetails(false);
    } catch (error) {
      console.log("Could not delete item" + error);
    }
  };

  const getItem = async (id) => {
    try {
      const res = await fetch(`${apiURL}/items/${id}`);
      const data = await res.json();
      setTargetItem(data);
      setShowDetails(true);
    } catch (error) {
      console.log("Couldn't get item" + error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setTitleSearch(e.target.value);
  };

  const getFilteredPosition = () => {
    let newSearchTerm = titleSearch.toLowerCase();
    return items.filter((v) => {
      let lowerCaseName = v.title.toLowerCase();
      return lowerCaseName.includes(newSearchTerm);
    });
  };

  const filteredTitles = getFilteredPosition();

  return (
    <>
      <Header />

      <main>
        {/* If showDetails is false */}
        {!showDetails ? (
          <>
            {/* If showDetails is false && showForm is false */}
            {!showForm ? (
              <>
                <div className="search-add-item-container">
                  <input
                    className="searchInput"
                    placeholder="Search for items"
                    type="text"
                    onChange={handleChange}
                    value={titleSearch}
                  />

                  {/* <div className="buttonDiv"> */}
                  <button
                    className="itemButton"
                    onClick={() => setShowForm(!showForm)}
                  >
                    ADD ITEM
                  </button>
                  {/* </div> */}
                </div>
                <h2 className="header-subtitle">Items Store</h2>
                <ItemsList items={filteredTitles} getItem={getItem} />
              </>
            ) : (
              // If showDetails is false && showForm is true
              <CreateForm setShowForm={setShowForm} fetchItems={fetchItems} />
            )}
          </>
        ) : (
          <>
            {/* If showDetails is true */}
            {!editForm ? (
              // if showDetails is true && editForm is false
              <Detail
                deleteItem={deleteItem}
                item={targetItem}
                setShowDetails={setShowDetails}
                setEditForm={setEditForm}
              />
            ) : (
              // if showDetails is true && editForm is true
              <UpdateForm
                item={targetItem}
                setEditForm={setEditForm}
                fetchItems={fetchItems}
                setShowDetails={setShowDetails}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
