import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { createTodolistAC } from "@/features/todolists/model/todolists-reducer"
import { Container, Grid } from "@mui/material"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"

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


