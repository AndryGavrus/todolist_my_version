import { Grid, Paper } from "@mui/material"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { selectTodolists } from "../../model/todolists-selectors"

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {
                todolists.map((todolist) => {
                    return (
                        <Grid key={todolist.id}>
                            <Paper sx={{ p: '0 20px 20px 20px' }}>
                                <TodolistItem
                                    key={todolist.id}
                                    todolist={todolist}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </>
    )
}

