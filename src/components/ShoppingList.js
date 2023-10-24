import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Fetch Request
  useEffect(()=>{
    fetch('http://localhost:4000/items')
    .then(res => res.json())
    .then(items => setItems(items))
  },[])

  //Functions Used in Child Components
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem (newItem){
    setItems(prevItems => [...prevItems, newItem])
  }
  function handleUpdateItem (updateItem){
    const updatedItem = items.map(item => {
      if(item.id === updateItem.id){
        return updateItem
      }else{
        return item
      }
    })
    setItems(updatedItem)
  }
  //Iteration through Items to display in DOM
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onUpdateItem={handleUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
