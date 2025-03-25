import { Task } from "./App"


type Props = {
    title: string
    tasks: Task[]
}

export const TodolistItem = ({ title, tasks }: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}