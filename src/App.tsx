import { useReducer, useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { nanoid } from '@reduxjs/toolkit'
import { CreateItemForm } from './CreateItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { containerSx } from './TodolistItem.styles'
import { NavButton } from './NavButton'
import { createTheme, CssBaseline, Switch, ThemeProvider } from '@mui/material'
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from './model/todolists-reducer'

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

type ThemeMode = 'dark' | 'light'

export const App = () => {
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasks, setTasks] = useState<TasksState>({})

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title) 
        dispatchToTodolists(action)
        setTasks({ ...tasks, [action.payload.id]: [] })
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const changeTaskTitle = (
        todolistId: string,
        taskId: string,
        title: string
    ) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) =>
                t.id === taskId ? { ...t, title } : t
            ),
        })
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
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
        dispatchToTodolists(deleteTodolistAC(todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
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

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (<ThemeProvider theme={theme}>
        <div className="app">
            <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode} />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm onCreateItem={createTodolist} />
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map((todolist) => {
                        const todolistTasks = tasks[todolist.id]
                        let filteredTasks = todolistTasks
                        if (todolist.filter === 'active') {
                            filteredTasks = todolistTasks.filter(
                                (task) => !task.isDone
                            )
                        }
                        if (todolist.filter === 'completed') {
                            filteredTasks = todolistTasks.filter(
                                (task) => task.isDone
                            )
                        }
                        return (
                            <Grid key={todolist.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <TodolistItem
                                        changeTodolistTitle={
                                            changeTodolistTitle
                                        }
                                        changeTaskTitle={changeTaskTitle}
                                        deleteTodolist={deleteTodolist}
                                        key={todolist.id}
                                        todolist={todolist}
                                        tasks={filteredTasks}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        createTask={createTask}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    </ThemeProvider>
    )
}
