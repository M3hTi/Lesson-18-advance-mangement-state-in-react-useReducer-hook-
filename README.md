# Step-by-Step Guide to React's useReducer Hook

## Table of Contents
1. [Understanding Reducers](#understanding-reducers)
2. [Basic Implementation](#basic-implementation)
3. [Advanced Usage](#advanced-usage)
4. [Complex Examples](#complex-examples)
5. [Best Practices](#best-practices)

## Understanding Reducers

### Step 1: What is a Reducer?
A reducer is a pure function that takes two arguments:
1. Current state
2. Action object

And returns a new state based on these inputs.

```javascript
const reducer = (state, action) => {
  // Logic here
  return newState;
}
```

### Step 2: Action Structure
An action is an object that typically has:
- `type`: Describes what kind of state change to make
- `payload` (optional): Additional data needed for the change

```javascript
const action = {
  type: 'ADD_TODO',
  payload: {
    id: 1,
    text: 'Learn React'
  }
}
```

## Basic Implementation

### Step 3: Creating Your First Reducer
Let's start with a simple counter reducer:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      throw new Error("unhandled action type");
  }
}
```

### Step 4: Using useReducer Hook
```javascript
import * as React from 'react'

function App() {
  // First argument: reducer function
  // Second argument: initial state
  const [count, dispatchCount] = React.useReducer(reducer, 0)

  return (
    // JSX here
  )
}
```

### Step 5: Complete Counter Implementation
```javascript
import * as React from 'react'
import './App.css'

function reducer(state, action) {
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
  const [count, dispatchCount] = React.useReducer(reducer, 0)

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
```

### Step 6: Adding Styles
```css
.counter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.counter-value {
  font-size: 24px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.counter-button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.increment {
  background-color: #4CAF50;
  color: white;
}

.decrement {
  background-color: #f44336;
  color: white;
}

.counter-button:hover {
  opacity: 0.9;
}
```

## Advanced Usage

### Step 7: Managing Complex State
Let's create a todo list with multiple state transitions:

```javascript
// Define initial state
const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];

// Create reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        }
        return todo;
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        }
        return todo;
      });
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        task: action.task,
        complete: false
      }];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};
```

### Step 8: Implementing Complex Component
```javascript
function TodoApp() {
  const [todos, dispatch] = React.useReducer(todoReducer, initialTodos);
  const [task, setTask] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', task });
    setTask('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => 
                dispatch({
                  type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
                  id: todo.id
                })
              }
            />
            <span style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button
              onClick={() => dispatch({ type: 'REMOVE_TODO', id: todo.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Best Practices

### Step 9: Organizing Actions
```javascript
// Define action types as constants
const ACTIONS = {
  DO_TODO: 'DO_TODO',
  UNDO_TODO: 'UNDO_TODO',
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO'
};

// Create action creators
const doTodo = (id) => ({
  type: ACTIONS.DO_TODO,
  id
});

const undoTodo = (id) => ({
  type: ACTIONS.UNDO_TODO,
  id
});
```

### Step 10: Using with Context
```javascript
const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const [todos, dispatch] = React.useReducer(todoReducer, initialTodos);

  const value = {
    todos,
    dispatch
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// Usage in child components
function TodoItem({ todo }) {
  const { dispatch } = React.useContext(TodoContext);
  
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => dispatch(todo.complete ? undoTodo(todo.id) : doTodo(todo.id))}
      />
      {todo.task}
    </li>
  );
}
```

## When to Use useReducer

Use useReducer when:
1. State logic is complex
2. Multiple state updates are related
3. Next state depends on previous state
4. You need predictable state updates
5. You want to centralize state update logic

## Common Patterns and Tips

1. **Immutable Updates**:
```javascript
// Wrong
state.completed = true;
return state;

// Correct
return {
  ...state,
  completed: true
};
```

2. **Complex State Updates**:
```javascript
case 'UPDATE_NESTED':
  return {
    ...state,
    nested: {
      ...state.nested,
      field: action.value
    }
  };
```

3. **Error Handling**:
```javascript
default:
  console.error(`Unhandled action type: ${action.type}`);
  return state;
```

## Testing Reducers

```javascript
describe('todoReducer', () => {
  it('should handle DO_TODO', () => {
    const initialState = [
      { id: 1, task: 'Test', complete: false }
    ];
    
    const action = { type: 'DO_TODO', id: 1 };
    
    const newState = todoReducer(initialState, action);
    
    expect(newState[0].complete).toBe(true);
  });
});
```

## Conclusion

useReducer is a powerful tool for managing complex state in React applications. By following these steps and patterns, you can effectively implement and manage state transitions in your applications. Remember to:

1. Keep reducers pure
2. Use immutable state updates
3. Organize actions and action creators
4. Consider combining with Context for global state
5. Test your reducers
6. Document your action types and their expected payloads

Would you like to dive deeper into any specific aspect or see more examples?
