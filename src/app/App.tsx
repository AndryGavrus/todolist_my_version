import { useState } from 'react'
import './App.css'
import { TodolistItem } from '../TodolistItem'
import { CreateItemForm } from '../CreateItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { containerSx } from '../TodolistItem.styles'
import { NavButton } from '../NavButton'
import { createTheme, CssBaseline, Switch, ThemeProvider } from '@mui/material'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from '../model/todolists-reducer'
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from '../model/tasks-reducer'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import { selectTasks } from '../model/tasks-selectors'
import { selectTodolists } from '../model/todolists-selectors'
import { changeThemeModeAC, ThemeMode } from './app-reducer'
import { useSelector } from 'react-redux'
import { selectThemeMode } from './app-selectors'
import { getTheme } from '../common/theme/theme'
import { Header } from '@/common/components/Header/Header'
import { Main } from './Main'



export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline />
                <Header />
                <Main />
            </div>
        </ThemeProvider>
    )
}
