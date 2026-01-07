import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [counter , setCounter] = useState(15)

  //let counter = 15;

  const addValue = ()=>{

    console.log("Clicked" , counter);
    counter = counter + 1
    setCounter()

  }

  return (
    <>
    
     <h1>Chai Our React</h1>
     <h2>Counter value : {counter}</h2>

     <button onClick={addValue}>Add Value</button>
     <br />
     <button>Remove Value</button>
    </>
  )
}

export default App
