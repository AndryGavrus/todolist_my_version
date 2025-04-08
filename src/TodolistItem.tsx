import { ChangeEvent } from 'react'
import { FilterValues, Task, Todolist } from './App'
import { Button } from './Button'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'

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
}: Props) => {
    const changeTaskTitleHandler = (title: string) => {
        changeTaskTitle(id, task.id, title)
    }
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title="x" onClick={deleteTodolistHandler} />
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map((t) => {
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
                            <li
                                key={t.id}
                                className={t.isDone ? 'is-done' : ''}
                            >
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan value={t.title} />
                                <Button
                                    title={'x'}
                                    onClick={deleteTaskHandler}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title="All"
                    onClick={() => changeFilterHandler('all')}
                />
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title="Active"
                    onClick={() => changeFilterHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title="Completed"
                    onClick={() => changeFilterHandler('completed')}
                />
            </div>
        </div>
    )
}
