import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editId){
      const editTodo = todos.find((t) => t.id===editId);
      const updatedTodos = todos.map((t) => 
        t.id === editTodo.id ? 
          (t = {id:t.id, todo}) :
          {id: t.id, todo: t.todo}
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");

      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    // e.preventDefault();
    const editTodo = todos.find(c => c.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    // e.preventDefault();
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={handleChange} />
          <button>{editId? "Edit" : "Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
