import { Box, IconButton } from "@mui/material"
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { Todolist, deleteTodolistAC, changeTodolistTitleAC } from "../../../../model/todolists-reducer"
import DeleteIcon from '@mui/icons-material/Delete'
import { containerSx } from "@/common/styles/container.styles"

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
        <Box sx={containerSx}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} />
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}
