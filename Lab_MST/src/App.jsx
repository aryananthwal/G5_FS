// Question 1

// import React from 'react';

// function ProductCard({name, price, description, inStock}){
//   return(
//     <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', borderRadius: '8px' }}>
//       <h2>{name}</h2>
//       <p>Price: ${price}</p>
//       <p>{description}</p>

//       {inStock ? (
//         <button>Buy Now</button>
//       ) : (
//         <p style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</p>
//       )}
//     </div>
//   )
// }


// function App(){
//   return(
//     <div>
//       <h1>Our product</h1>
//       <ProductCard 
//         name="Smart TV" 
//         price={450}
//         description="A 55-inch 4K Smart TV." 
//         inStock={true} 
//       />
//       <ProductCard 
//         name="Wireless Mouse" 
//         price={25}
//         description="An ergonomic wireless mouse." 
//         inStock={false} 
//       />
//       <ProductCard 
//         name="Mechanical Keyboard" 
//         price={90}
//         description="A backlit gaming keyboard." 
//         inStock={true} 
//       />
//     </div>
//   );
// }

// export default App;



// Question 2

import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;
    setTodos([...todos, inputValue]);
    setInputValue('');
  };

  const handleDelete = (indexToDelete) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>My Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            {/* --- UPDATED: Removed the style from the button --- */}
            <button onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;