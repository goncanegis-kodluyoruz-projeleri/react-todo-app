import React, { useState } from 'react'

export const Form = props => {
  const [name, setName] = useState('')

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.addTask(name)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="view">
        <input
          type="text"
          id="new-todo-input"
          className="new-todo"
          name="text"
          autoComplete="off"
          placeholder="What needs to be done?"
          autoFocus
          value={name}
          onChange={handleChange}
        />
        {/* <label htmlFor="new-todo-input">What needs to be done?</label> */}
        <button type="submit" className="submit-btn">
          Add
        </button>
      </div>
    </form>
  )
}
