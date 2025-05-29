import { IconButton } from "@mui/material"
import { EditableSpan } from "./EditableSpan"
import { useAppDispatch } from "./app/hooks/useAppDispatch"
import { Todolist, deleteTodolistAC, changeTodolistTitleAC } from "./model/todolists-reducer"
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { id, title } = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({ id }))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({ id, title }))
    }

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} />
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
