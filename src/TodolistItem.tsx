import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValues, Task } from "./App"
import { Button } from "./Button"


type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = ({ title,
    tasks,
    deleteTask,
    changeFilter,
    createTask
}: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')

    // const createTaskHandler = () => {
    //     if (inputRef.current) {
    //         createTask(inputRef.current.value)
    //         inputRef.current.value = ''
    //     }
    // }   

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }



    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
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
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler} />
                <Button title="+" onClick={createTaskHandler} />

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
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler} />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title="All" onClick={() => changeFilter("all")} />
                <Button title="Active" onClick={() => changeFilter("active")} />
                <Button title="Completed" onClick={() => changeFilter("completed")} />
            </div>
        </div>
    )
}