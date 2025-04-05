import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { nanoid } from '@reduxjs/toolkit'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const todolistId1 = nanoid()
    const todolistId2 = nanoid()

    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: nanoid(), title: 'HTML&CSS', isDone: true },
            { id: nanoid(), title: 'JS', isDone: true },
            { id: nanoid(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: nanoid(), title: 'Redux', isDone: false },
            { id: nanoid(), title: 'Typescript', isDone: false },
            { id: nanoid(), title: 'RTK query', isDone: false },
        ],
    })

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        const newTodolists = todolists.map((todolist) =>
            todolist.id === todolistId ? { ...todolist, filter } : todolist
        )
        setTodolists(newTodolists)
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        const filteredTasks = tasks[todolistId].filter((t) => t.id !== taskId)
        setTasks({ ...tasks, [todolistId]: filteredTasks })
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = { id: nanoid(), title, isDone: false }
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const deleteTodolist = (todolistId: string) => {
      setTodolists(todolists.filter(tl=> tl.id !== todolistId))
      delete tasks[todolistId]
      setTasks({...tasks})
    }

    const changeTaskStatus = (
        todolistId: string,
        taskId: string,
        isDone: boolean
    ) => {
        const newState = tasks[todolistId].map((t) =>
            t.id === taskId ? { ...t, isDone } : t
        )
        setTasks({ ...tasks, [todolistId]: newState })
    }

    return (
        <div className="app">
            {todolists.map((todolist) => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter((task) => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter((task) => task.isDone)
                }
                return (
                    <TodolistItem
                        deleteTodolist={deleteTodolist}
                        key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
        </div>
    )
}
