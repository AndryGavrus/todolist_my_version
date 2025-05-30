import { List } from "@mui/material";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { Todolist } from "../../../../model/todolists-reducer";
import { TaskItem } from "./TaskItem/TaskItem";
import { selectTasks } from "@/features/todolists/model/tasks-selectors";


type Props = {
    todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {


    const { id, filter } = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter((task: { isDone: boolean; }) => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter((task: { isDone: boolean; }) => task.isDone)
    }



    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map((task: { id: string; isDone: boolean; title: string }) => {
                        return <TaskItem key={task.id} task={task} todolistId={id} />
                    }
                    )}
                </List>
            )}
        </>
    )
}


