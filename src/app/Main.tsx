import { CreateItemForm } from "@/CreateItemForm"
import { changeTaskTitleAC, deleteTaskAC, createTaskAC, changeTaskStatusAC } from "@/model/tasks-reducer"
import { selectTasks } from "@/model/tasks-selectors"
import { createTodolistAC, changeTodolistTitleAC, FilterValues, changeTodolistFilterAC, deleteTodolistAC } from "@/model/todolists-reducer"
import { selectTodolists } from "@/model/todolists-selectors"
import { TodolistItem } from "@/TodolistItem"
import { Container, Grid, Paper } from "@mui/material"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"

export const Main = () => {

        // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
        // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})
    
        const todolists = useAppSelector(selectTodolists)
        const tasks = useAppSelector(selectTasks)
    
        const dispatch = useAppDispatch()
    
        const createTodolist = (title: string) => {
            const action = createTodolistAC(title)
            dispatch(action)
        }
    
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
    
        const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
            dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }))
        }
    
    return (
        <div>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm onCreateItem={createTodolist} />
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map((todolist) => {
                        const todolistTasks = tasks[todolist.id]
                        let filteredTasks = todolistTasks
                        if (todolist.filter === 'active') {
                            filteredTasks = todolistTasks.filter((task: { isDone: boolean }) => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            filteredTasks = todolistTasks.filter((task: { isDone: boolean }) => task.isDone)
                        }
                        return (
                            <Grid key={todolist.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <TodolistItem
                                        changeTodolistTitle={changeTodolistTitle}
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
    )
}


