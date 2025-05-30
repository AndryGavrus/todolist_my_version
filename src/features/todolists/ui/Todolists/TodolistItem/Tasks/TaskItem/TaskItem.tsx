import { ListItem, Checkbox, IconButton } from "@mui/material"
import { ChangeEvent } from "react"
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import { deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, Task } from "@/features/todolists/model/tasks-reducer"
import { getListItemSx } from "./TaskItem.styles"

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({ todolistId, taskId: task.id }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: newStatusValue }))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteSweepRoundedIcon />
            </IconButton>
        </ListItem>
    )
}
