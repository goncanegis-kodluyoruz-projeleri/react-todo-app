import React, { useState } from 'react'

export const Todo = props => {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }

  const viewTemplate = (
    <div className="view">
      <input
        id={props.id}
        className="toggle"
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      <label
        htmlFor={props.id}
        // onClick={() => setEditing(true)}
        onChange={handleChange}
      >
        {props.name}
      </label>

      {/* Buttons */}
      <div className="button-container">
        {/* edit button */}
        <button
          type="button"
          className="edit-btn"
          onClick={() => setEditing(true)}
          autoFocus
        >
          <i class="fas fa-edit"></i>
        </button>

        {/* delete button */}
        <button
          type="button"
          className="delete-btn"
          onClick={() => props.deleteTask(props.id)}
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  )

  const editingTemplate = (
    <form className="view" onSubmit={handleSubmit}>
      <input
        id={props.id}
        className="edit-todo"
        type="text"
        value={newName}
        placeholder={props.name}
        onChange={handleChange}
        autoFocus
      />

      {/* Buttons */}
      <div className="button-container">
        {/* cancel button */}
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>

        {/* save button */}
        <button type="submit" className="save-btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  )

  return (
    <li className={props.completed === true ? 'completed' : ''}>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}
