import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValues, Task } from "./App"
import { Button } from "./Button"


type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({ title,
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    filter
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
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler} className={error? 'error' : ''}/>
                <Button title="+" onClick={createTaskHandler} />
                {error && <p className="error-message">{error}</p>}

                {/* <input ref={inputRef} /> */}
                {/* <Button title="+" onClick={createTaskHandler} /> */}

            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const deleteTaskHandler = () => {
                            deleteTask(t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <span>{t.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler} />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === "all"? 'active-filter' : ''} title="All" onClick={() => changeFilter("all")} />
                <Button className={filter === "active"? 'active-filter' : ''} title="Active" onClick={() => changeFilter("active")} />
                <Button className={filter === "completed"? 'active-filter' : ''} title="Completed" onClick={() => changeFilter("completed")} />
            </div>
        </div>
    )
}