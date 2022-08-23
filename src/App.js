import './App.css';
import React, { useState, useEffect, useReducer, useRef, useContext } from 'react'
import Star from './components/Star';
import Users from './components/Users';
import useInput from './components/useInput';
import { useTrees, TreesContext } from './';
import useFetch from './components/useFetch';

const initialState = {
  message: "hi"
}

function reducer(state, action) {
  switch(action.type) {
    case 'yell':
      return {
        message: `HEY! I just said ${state.message}`
      }
    case 'whisper':
      return {
        message: `excuse me, I just said ${state.message}`
      }
    default: 
      return initialState
  }
}

function App({login}) {
  const {loading, data, error} = useFetch(`https://api.github.com/users/${login}`)
  // const sound = useRef()
  // const color = useRef()

  // const [sound, setSound] = useState("")
  // const [color, setColor] = useState("")
  const [titleProps, resetTitle] = useInput("")
  const [colorProps, resetColor] = useInput("")

  const [status, setStatus] = useState("Not Delivered")
  // const [checked, setChecked] = useState(false)
  const [checked, setChecked] = useReducer((checked) => !checked, false)
  const [name, setName] = useState("Jan")
  const [users, setUsers] = useState([])
  const [number, setNumber] = useReducer((number, newNumber) => number + newNumber, 0)
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    document.title = `Celebrate ${name}`
  }, [name])

  useEffect(() => {
    fetch(`https://api.github.com/users`)
    .then(res => res.json())
    .then(res2 => setUsers(res2))
    .catch(err => console.log(err))
  }, [])

  // const formSubmit = (e) => {
  //   e.preventDefault()
  //   const soundValue = sound.current.value
  //   const colorValue = color.current.value
  //   let heading = document.getElementById("soundAndColor")
  //   heading.style.disabled = false
  //   heading.textContent = `${soundValue} sounds like ${colorValue}`
  //   sound.current.value = ""
  //   color.current.value = ""
  // }

  // const formSubmit = (e) => {
  //   e.preventDefault()
  //   let heading = document.getElementById("soundAndColor")
  //   heading.style.disabled = false
  //   heading.textContent = `${sound} sounds like ${color}`
  //   setSound("")
  //   setColor("")
  // }

  const formSubmit = (e) => {
    e.preventDefault()
    let heading = document.getElementById("soundAndColor")
    heading.style.disabled = false
    heading.textContent = `${titleProps.value} sounds like ${colorProps.value}`
    resetTitle()
    resetColor()
  }

  // const {trees} = useContext(TreesContext)
  const {trees} = useTrees()

  if (loading) return <h1>loading...</h1>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <div className="App">
      <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <img src={data.avatar_url} alt={data.login} />
        <h1>{data.login}</h1>
        <h1>{data.name && <p>{data.name}</p>}</h1>
      </div>

      <div>
        <h1>Trees I've heard of</h1>
        {trees.map(tree => (
          <li key={tree.id}>{tree.type}</li>
        ))}
      </div>


      <h1 onClick={() => setNumber(1)}>{number}</h1>

      <h1>The package is: {status}</h1>
      <button onClick={() => status === "Not Delivered" ? setStatus("Delivered") : setStatus("Not Delivered")}>Deliver</button>

      {/* <input type="checkbox" value={checked} onChange={() => setChecked(!checked)}/>
      <p>{checked ? "checked" : "not checked"}</p> */}

      {/* <input type="checkbox" value={checked} onChange={setChecked}/>
      <p>{checked ? "checked" : "not checked"}</p> */}

      <Star total={5} />

      <p>Message: {state.message}</p>
      <button onClick={() => dispatch({type: "yell"})}>Yell</button>
      <button onClick={() => dispatch({type: "whisper"})}>Whisper</button>

      {/* <form onSubmit={formSubmit}>
        <h3 id="soundAndColor" style={{disabled: 'true'}}></h3>  
        <input ref={sound} type="text" placeholder='Sound...'/>
        <input ref={color} type="color" />
        <button>Add</button>
      </form> */}

      {/* <form onSubmit={formSubmit}>
        <h3 id="soundAndColor" style={{disabled: 'true'}}></h3>  
        <input onChange={(e) => setSound(e.target.value)} value={sound} type="text" placeholder='Sound...'/>
        <input onChange={(e) => setColor(e.target.value)} value={color} type="color" />
        <button>Add</button>
      </form> */}

      <form onSubmit={formSubmit}>
        <h3 id="soundAndColor" style={{disabled: 'true'}}></h3>  
        <input {...titleProps} type="text" placeholder='Sound...'/>
        <input {...colorProps} type="color" />
        <button>Add</button>
      </form>

      <section>
        <p>Congratulations {name}!</p>
        <button onClick={() => setName("Will")}>Change Winner</button>
      </section>

      
      <Users data={users} setData={setUsers}/>
    </div>
  );
}

export default App;