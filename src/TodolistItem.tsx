import { ChangeEvent } from 'react'
import { FilterValues, Task, Todolist } from './App'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, IconButton, List, ListItem } from '@mui/material'

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (
        todolistId: string,
        taskId: string,
        isDone: boolean
    ) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = ({
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle,
}: Props) => {
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan
                        value={title}
                        onChange={changeTodolistTitleHandler}
                    />
                </h3>
                <IconButton onClick={deleteTodolistHandler} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map((t) => {
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, t.id, title)
                        }
                        const deleteTaskHandler = () => {
                            deleteTask(id, t.id)
                        }
                        const changeTaskStatusHandler = (
                            e: ChangeEvent<HTMLInputElement>
                        ) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, t.id, newStatusValue)
                        }
                        return (
                            <ListItem
                                key={t.id}
                                sx={{
                                    p: 0,
                                    justifyContent: 'space-between',
                                    opacity: t.isDone ? 0.5 : 1,
                                }}
                            >
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
                                <IconButton
                                    onClick={deleteTaskHandler}
                                    aria-label="delete"
                                >
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
