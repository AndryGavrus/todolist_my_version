import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { nanoid } from '@reduxjs/toolkit'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const [tasks, setTasks] = useState([
    { id: nanoid(), title: 'HTML&CSS', isDone: true },
    { id: nanoid(), title: 'JS', isDone: true },
    { id: nanoid(), title: 'ReactJS', isDone: false },
    { id: nanoid(), title: 'Redux', isDone: false },
    { id: nanoid(), title: 'Typescript', isDone: false },
    { id: nanoid(), title: 'RTK query', isDone: false },
  ])

  const [filter, setFilter] = useState<FilterValues>('all')

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter(t => t.id !== taskId)
    return setTasks(filteredTasks)
  }

  const createTask = (title: string) => {
    const newTask = { id: nanoid(), title, isDone: false }
    setTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map(t => t.id === taskId ? { ...t, isDone } : t)
    setTasks(newState)
  }

  return (
    <div className="app">
      <TodolistItem title="What to learn"
        tasks={filteredTasks}
        filter={filter}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus} />
    </div>
  )
}
