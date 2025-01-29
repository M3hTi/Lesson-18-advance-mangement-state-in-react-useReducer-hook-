import * as React from 'react'

import './App.css'

function reducer(state,action) {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case 'increment':
     return state + 1
    case 'decrement':
     return state - 1
    default:
      throw new Error("unhandled action type");
  }
}

function App() {
  const [count, dispatchCount] = React.useReducer(reducer,0)

  return (
    <div className="counter-container">
      <h2 className="counter-value">Count is: {count}</h2>
      <div className="button-group">
        <button 
          className="counter-button increment"
          onClick={() => dispatchCount({type: 'increment'})}
        >
          increment
        </button>
        <button 
          className="counter-button decrement"
          onClick={() => dispatchCount({type: 'decrement'})}
        >
          decrement
        </button>
      </div>
    </div>
  )
}

export default App
