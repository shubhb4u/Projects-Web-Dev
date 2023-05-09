import React from 'react'

const TodoForm = ({handleSubmit,todo,handleChange,editId}) => {
  return (
    <div>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={handleChange} />
          <button>{editId? "Edit" : "Go"}</button>
        </form>
    </div>
  )
}

export default TodoForm