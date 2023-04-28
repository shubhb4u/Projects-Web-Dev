import React from 'react'
import { useState } from 'react';
import "./App.css";

const App = () => {

  const [todo, setTodo ] = useState("") // For single todo entry
  const [todos, setTodos] = useState([]) // For all todos entries use array

  const handleSubmit = (e) => { // Will be fired when Go button is clicked

    e.preventDefault();

    if(todo !== ''){
      setTodos([{id:`${todo}-${Date.now}`,todo},...todos])
      setTodo("") // empty the input box after clicking go button
    }
  }

  const handleDelete = (id) => {

    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo])
  }

  const handleEdit = (id) => {

    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo)
  }

  return (
    <div className = "App">
      <div className = "container">
        <h1>Todo List App</h1>
        <form className = "todoForm" onSubmit = {handleSubmit}>
          <input type = "text" value ={todo} onChange = {(e) => setTodo(e.target.value)}></input>
          <button type = "submit">Go</button> 
        </form>

        <ul className = "allTodos">
        {
          todos.map((t) =>(
            <li className = "singleTodo">
              <span className= "todoText" key={t.id}>{t.todo}</span>
              <button onClick = {() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default App