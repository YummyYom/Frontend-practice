// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(item, initialState = '',
{serialize = JSON.stringify, deserialize = JSON.parse,} = {}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [state, setState] = React.useState( () => {
    const storageValue = window.localStorage.getItem(item)
        if(storageValue)
          return deserialize(storageValue)

        return  typeof initialState === 'function' ? initialState() : initialState
  })

    const prevKeyRef = React.useRef(item)

  React.useEffect(() =>  {
      const prevKey = prevKeyRef.current
      if(prevKey !== item){
          window.localStorage.removeItem(item)
      }
      prevKeyRef.current = item
      window.localStorage.setItem(item, serialize(state))
      },[item, serialize, state])
    return [state, setState]
  }

  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)


function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Yome"/>
}

export default App
