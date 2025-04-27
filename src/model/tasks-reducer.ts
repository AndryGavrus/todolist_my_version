import { nanoid } from '@reduxjs/toolkit'
import { TasksState } from '../App'
import { createTodolistAction, DeleteTodolistAction } from './todolists-reducer'

const initialState: TasksState = {}

type Actions =
    | createTodolistAction
    | DeleteTodolistAction
    | deleteTaskAction
    | createTaskAction
    | changeTaskStatusAction
    | changeTaskTitleAction

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return { ...state, [action.payload.id]: [] }
        }
        case 'delete_todolist': {
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            const filteredTasks = state[action.payload.todolistId].filter(
                (t) => t.id !== action.payload.taskId,
            )
            return { ...state, [action.payload.todolistId]: filteredTasks }
        }
        case 'create_task': {
            const newTask = {
                id: nanoid(),
                title: action.payload.title,
                isDone: false,
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
            }
        }
        case 'changeStatus_task': {
            const newState = state[action.payload.todolistId].map((t) =>
                t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
            )
            return { ...state, [action.payload.todolistId]: newState }
        }
        case 'changeTitle_task': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
                ),
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: { todolistId: string; taskId: string }) => {
    return {
        type: 'delete_task',
        payload,
    } as const
}
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>

export const createTaskAC = (payload: { todolistId: string; title: string }) => {
    return {
        type: 'create_task',
        payload,
    } as const
}
export type createTaskAction = ReturnType<typeof createTaskAC>

export const changeTaskStatusAC = (payload: {
    todolistId: string
    taskId: string
    isDone: boolean
}) => {
    return {
        type: 'changeStatus_task',
        payload,
    } as const
}
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (payload: {
    todolistId: string
    taskId: string
    title: string
}) => {
    return {
        type: 'changeTitle_task',
        payload,
    } as const
}
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
