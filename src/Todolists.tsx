import { Grid, Paper } from "@mui/material"
import { TodolistItem } from "./TodolistItem"
import { useAppSelector } from "./app/hooks/useAppSelector"
import { changeTaskTitleAC, deleteTaskAC, createTaskAC } from "./model/tasks-reducer"
import { changeTodolistTitleAC, FilterValues, changeTodolistFilterAC, deleteTodolistAC } from "./model/todolists-reducer"
import { selectTodolists } from "./model/todolists-selectors"
import { useAppDispatch } from "./app/hooks/useAppDispatch"


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({ id: todolistId, title }))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({ todolistId, taskId, title }))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({ todolistId, taskId }))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({ todolistId, title }))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({ id: todolistId }))
    }

    return (
        <>
            {
                todolists.map((todolist) => {
                    return (
                        <Grid key={todolist.id}>
                            <Paper sx={{ p: '0 20px 20px 20px' }}>
                                <TodolistItem
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeTaskTitle={changeTaskTitle}
                                    deleteTodolist={deleteTodolist}
                                    key={todolist.id}
                                    todolist={todolist}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    createTask={createTask}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </>
    )
}

