import React, { useState } from "react";
import "./ItemList.css"; 

function ItemList() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([
    { text: "Item 1", completed: false },
    { text: "Item 2", completed: false },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      if (editIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editIndex] = { text: newItem, completed: false };
        setItems(updatedItems);
        setEditIndex(null);
      } else {
        setItems([...items, { text: newItem, completed: false }]);
      }

      setNewItem("");
    }
  };

  const handleEditItem = (index) => {
    setNewItem(items[index].text);
    setEditIndex(index);
  };
  const handleToggleCompletion = (index) => {
    const updateItems = [...items];
    updateItems[index] = {
      ...updateItems[index],
      completed: !updateItems[index].completed,
    };
    setItems(updateItems);
  };

  const handleRemoveItem = (index) => {
    const updateItems = [...items];
    updateItems.splice(index, 1);
    setItems(updateItems);
  };

  const handleConfirmItem = (index) => {
    const updateItems = [...items];
    updateItems[index] = {
      ...updateItems[index],
      completed: true,
    };
    setItems(updateItems);
  };

  return (
    <div className="container mt-4 ">
      <h1> To Do App </h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-group-item ${
              item.completed ? "completed-item" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleCompletion(index)}
            />{" "}
            <span className="ml-4">{item.text}</span>

            <span className="ml-4">
              <button
                className="btn btn-link"
                onClick={() => handleEditItem(index)}
              >
                Edit
              </button>
            </span>

            <span className="ml-4">
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </span>

            <span className="ml-4">
              <button
                className="btn btn-success"
                onClick={() => handleConfirmItem(index)}
                disabled={item.completed}
              >
                Confirm
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new item"
        />
        <br />
        <button className="btn btn-primary ml-5 mt-2" onClick={handleAddItem}>
          {editIndex !== null ? "Update Item" : "Add Item"}
        </button>
      </div>
    </div>
  );
}

export default ItemList;
