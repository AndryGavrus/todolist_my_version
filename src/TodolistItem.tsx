import { ChangeEvent } from 'react'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import { Box, Button, Checkbox, IconButton, List, ListItem } from '@mui/material'
import { containerSx, getListItemSx } from './TodolistItem.styles'
import { Todolist, FilterValues } from './model/todolists-reducer'
import { useAppSelector } from './app/hooks/useAppSelector'
import { selectTasks } from './model/tasks-selectors'
import { changeTaskStatusAC } from './model/tasks-reducer'
import { useAppDispatch } from './app/hooks/useAppDispatch'
import { TodolistTitle } from './TodolistTitle'

type Props = {
    todolist: Todolist
    deleteTask: (todolistId: string, taskId: string) => void
    createTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = ({
    todolist: { id, filter },
    todolist,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskTitle,
    }: Props) => {

    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter((task: { isDone: boolean }) => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter((task: { isDone: boolean }) => task.isDone)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }



    return (
        <div>
            <Box sx={containerSx}>
                <TodolistTitle todolist={todolist}/>
            </Box>
            <CreateItemForm onCreateItem={createTaskHandler} />
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map((t: { id: string; isDone: boolean; title: string }) => {
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, id, title)
                        }
                        const deleteTaskHandler = () => {
                            deleteTask(id, id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC({ todolistId: id, taskId: t.id, isDone: newStatusValue }))
                        }
                        return (
                            <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
                                <div>
                                    <Checkbox
                                        size="small"
                                        checked={t.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <EditableSpan
                                        value={t.title}
                                        onChange={changeTaskTitleHandler}
                                    />
                                </div>
                                <IconButton onClick={deleteTaskHandler} aria-label="delete">
                                    <DeleteSweepRoundedIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Button
                    size="small"
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={() => changeFilterHandler('all')}
                >
                    All
                </Button>
                <Button
                    size="small"
                    variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={() => changeFilterHandler('active')}
                >
                    Active
                </Button>
                <Button
                    size="small"
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={() => changeFilterHandler('completed')}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}
