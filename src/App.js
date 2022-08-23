import './App.css';
import React, { useState, useEffect } from 'react'
import Star from './components/Star';
import Users from './components/Users';

function App() {
  const [status, setStatus] = useState("Not Delivered")
  const [checked, setChecked] = useState(false)
  const [name, setName] = useState("Jan")
  const [users, setUsers] = useState([])

  useEffect(() => {
    document.title = `Celebrate ${name}`
  }, [name])

  useEffect(() => {
    fetch(`https://api.github.com/users`)
    .then(res => res.json())
    .then(res2 => setUsers(res2))
    .catch(err => console.log(err))
  }, [])


  return (
    <div className="App">
      <h1>The package is: {status}</h1>
      <button onClick={() => status === "Not Delivered" ? setStatus("Delivered") : setStatus("Not Delivered")}>Deliver</button>

      <input type="checkbox" value={checked} onChange={() => setChecked(!checked)}/>
      <p>{checked ? "checked" : "not checked"}</p>

      <Star total={5} />

      <section>
        <p>Congratulations {name}!</p>
        <button onClick={() => setName("Will")}>Change Winner</button>
      </section>

      
      <Users data={users} />
    </div>
  );
}

export default App;