import { setAppStatusAC } from '@/app/app-slice'
import { RequestStatus } from '@/common/types'
import { createAppSlice } from '@/common/utils'
import { todolistsApi } from '../api/todolistsApi'
import { Todolist } from '../api/todolistsApi.types'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { ResultCode } from '@/common/enums'
import { handleServerAppError } from '@/common/utils/handleServerAppError'

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
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload?.todolists.forEach((tl) => {
                        state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
                    })
                },
            },
        ),
        changeTodolistStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        }),
        createTodolistTC: create.asyncThunk(
            async (title: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.createTodolist(title)
                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { todolist: res.data.data.item }
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({
                        ...action.payload.todolist,
                        filter: 'all',
                        entityStatus: 'idle',
                    })
                },
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    thunkAPI.dispatch(changeTodolistStatusAC({ id, entityStatus: 'loading' }))
                    const res = await todolistsApi.deleteTodolist(id)
                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { id }
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        thunkAPI.dispatch(changeTodolistStatusAC({ id, entityStatus: 'idle' }))
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    thunkAPI.dispatch(changeTodolistStatusAC({ id, entityStatus: 'idle' }))
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
                    const res = await todolistsApi.changeTodolistTitle(payload)
                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return payload
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
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

export const {
    changeTodolistFilterAC,
    changeTodolistStatusAC,
    fetchTodolistsTC,
    createTodolistTC,
    deleteTodolistTC,
    changeTodolistTitleTC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'
