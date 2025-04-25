import { TasksState } from '../App'
import { createTodolistAction, DeleteTodolistAction } from './todolists-reducer'

const initialState: TasksState = {}

type Actions =  createTodolistAction | DeleteTodolistAction | deleteTaskAction

export const tasksReducer = (
    state: TasksState = initialState,
    action: Actions
): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return { ...state, [action.payload.id]: [] }
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            const filteredTasks = state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId)
        return { ...state, [action.payload.todolistId]: filteredTasks }
        }
        default:
            return state
    }
}

export const deleteTaskAC=(payload:{ todolistId: string, taskId: string })=>{
    return {
        type: 'delete_task',
        payload
    } as const
}
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>