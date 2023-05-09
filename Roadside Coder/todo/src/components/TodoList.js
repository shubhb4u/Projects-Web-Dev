import React from 'react'

const TodoList = ({handleDelete,handleEdit,todos}) => {
  return (
    <div>
        {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
        ))}
    </div>
  )
}

export default TodoList