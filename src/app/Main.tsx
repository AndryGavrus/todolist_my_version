import { CreateItemForm } from "@/CreateItemForm"
import { createTodolistAC } from "@/model/todolists-reducer"
import { Container, Grid } from "@mui/material"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { Todolists } from "@/Todolists"

export const Main = () => {

    // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})



    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{ mb: '30px' }}>
                <CreateItemForm onCreateItem={createTodolist} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}


