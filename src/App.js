import './App.css';
import React, { useState } from 'react'
import Star from './components/Star';

function App() {
  const [status, setStatus] = useState("Not Delivered")
  const [checked, setChecked] = useState(false)
  return (
    <div className="App">
      <h1>The package is: {status}</h1>
      <button onClick={() => status === "Not Delivered" ? setStatus("Delivered") : setStatus("Not Delivered")}>Deliver</button>

      <input type="checkbox" value={checked} onChange={() => setChecked(!checked)}/>
      <p>{checked ? "checked" : "not checked"}</p>

      <Star total={5} />
    </div>
  );
}

export default App;