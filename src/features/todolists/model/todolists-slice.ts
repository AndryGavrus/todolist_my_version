import { setAppStatusAC } from '@/app/app-slice'
import { createAppSlice } from '@/common/utils'
import { todolistsApi } from '../api/todolistsApi'
import { Todolist } from '../api/todolistsApi.types'

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: (state) => state,
    },
    reducers: (create) => ({
        fetchTodolistsTC: create.asyncThunk(
            async (_, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.getTodolists()
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { todolists: res.data }
                } catch (error) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload?.todolists.forEach((tl) => {
                        state.push({ ...tl, filter: 'all' })
                    })
                },
            },
        ),
        createTodolistTC: create.asyncThunk(
            async (title: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.createTodolist(title)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { todolist: res.data.data.item }
                } catch (error) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({
                        ...action.payload.todolist,
                        filter: 'all',
                    })
                },
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.deleteTodolist(id)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { id }
                } catch (error) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                },
            },
        ),
        changeTodolistTitleTC: create.asyncThunk(
            async (payload: { id: string; title: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.changeTodolistTitle(payload)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return payload
                } catch (error) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state[index].title = action.payload.title
                    }
                },
            },
        ),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),
})

export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'
