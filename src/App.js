import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import { Form } from './components/Form'
import PageFooter from './components/PageFooter'
import { Todo } from './components/Todo'
import { FilterButton } from './components/FilterButton'

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  function addTask(name) {
    const newTask = {
      id: 'todo-' + nanoid(),
      name: name,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same id as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose 'completed' prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same id as the edited task
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  function clearCompleted() {
    const clearedTasks = tasks.filter(task => task.completed === false)
    setTasks(clearedTasks)
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      ispPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const tasksNoun = taskList.length !== 1 ? 'items' : 'item'

  return (
    <div>
      <section className="todoapp">
        {/* Header */}
        <header className="header">
          <h1>todos</h1>

          {/* Form */}
          <Form addTask={addTask} />
        </header>

        {taskList.length > 0 ? (
          <section className="main">
            {/* Mark all as complete */}
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {/* Iterating over and rendering tasks */}
            <ul className="todo-list">{taskList}</ul>
          </section>
        ) : (
          ''
        )}

        {/* App footer */}
        {taskList.length > 0 ? (
          <footer className="footer">
            {/* How many tasks left */}
            <span className="todo-count">
              <strong>{taskList.length} </strong>
              {tasksNoun} left
            </span>

            {/* Filter buttons */}
            <div className="filters">{filterList}</div>

            {/* Clear Completed */}
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          </footer>
        ) : (
          <div className="no-tasks">No tasks to show</div>
        )}
      </section>

      {/* Footer of the page */}
      <PageFooter />
    </div>
  )
}

export default App
