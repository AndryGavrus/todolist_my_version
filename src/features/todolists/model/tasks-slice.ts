import { setAppStatusAC } from '@/app/app-slice'
import { RootState } from '@/app/store'
import { ResultCode } from '@/common/enums'
import { createAppSlice } from '@/common/utils'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { tasksApi } from '../api/tasksApi'
import { DomainTask, UpdateTaskModel } from '../api/tasksApi.types'
import { createTodolistTC, deleteTodolistTC } from './todolists-slice'

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    selectors: {
        selectTasks: (state) => state,
    },
    reducers: (create) => ({
        fetchTasksTC: create.asyncThunk(
            async (todolistId: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.getTasks(todolistId)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { todolistId, tasks: res.data.items }
                } catch (error) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                },
            },
        ),
        createTaskTC: create.asyncThunk(
            async (args: { todolistId: string; title: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.createTask(args)
                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { task: res.data.data.item }
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
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                },
            },
        ),
        deleteTaskTC: create.asyncThunk(
            async (args: { todolistId: string; taskId: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.deleteTask(args)
                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return args
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
                    const tasks = state[action.payload.todolistId]
                    const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                    if (index !== -1) {
                        tasks.splice(index, 1)
                    }
                },
            },
        ),
        updateTaskTC: create.asyncThunk(
            async (args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> }, thunkAPI) => {
                const { todolistId, taskId, domainModel } = args

                const task = (thunkAPI.getState() as RootState).tasks[todolistId]?.find((t) => t.id === taskId)
                if (!task) return thunkAPI.rejectWithValue(null)

                const model: UpdateTaskModel = {
                    description: task.description,
                    title: domainModel.title !== undefined ? domainModel.title : task.title,
                    priority: domainModel.priority !== undefined ? domainModel.priority : task.priority,
                    startDate: domainModel.startDate !== undefined ? domainModel.startDate : task.startDate,
                    deadline: domainModel.deadline !== undefined ? domainModel.deadline : task.deadline,
                    status: domainModel.status !== undefined ? domainModel.status : task.status,
                }

                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.updateTask({ todolistId, taskId, model })
                    if (res.data.resultCode === ResultCode.Success) {
                        return args
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const { todolistId, taskId, domainModel } = action.payload

                    const task = state[todolistId]?.find((t) => t.id === taskId)
                    if (!task) return

                    if (domainModel.status !== undefined) {
                        // если status это enum TaskStatus — присваиваем напрямую
                        task.status = domainModel.status
                    }

                    if (domainModel.title !== undefined) {
                        task.title = domainModel.title
                    }
                },
            },
        ),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
})

export const { fetchTasksTC, deleteTaskTC, createTaskTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
