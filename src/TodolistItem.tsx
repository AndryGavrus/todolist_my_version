import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValues, Task, Todolist } from './App'
import { Button } from './Button'

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
}

export const TodolistItem = ({
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
}: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    // const createTaskHandler = () => {
    //     if (inputRef.current) {
    //         createTask(inputRef.current.value)
    //         inputRef.current.value = ''
    //     }
    // }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle != '') {
            createTask(id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const createTaskOnEnterHandler = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
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
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                    className={error ? 'error' : ''}
                />
                <Button title="+" onClick={createTaskHandler} />
                {error && <p className="error-message">{error}</p>}

                {/* <input ref={inputRef} /> */}
                {/* <Button title="+" onClick={createTaskHandler} /> */}
            </div>
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
                                <span>{t.title}</span>
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
