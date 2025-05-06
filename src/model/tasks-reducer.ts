import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { TasksState } from '../app/App'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer'

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{ todolistId: string, title: string }>("tasks/createTask")
export const changeTaskStatusAC = createAction<{
    todolistId: string
    taskId: string
    isDone: boolean
}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    todolistId: string
    taskId: string
    title: string
}>('tasks/changeTaskTitle')

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex((tasks) => tasks.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].push({
                id: nanoid(),
                title: action.payload.title,
                isDone: false,
            })
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const newTask = state[action.payload.todolistId].find(task=> task.id=== action.payload.taskId)
            if (newTask) {
                newTask.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const newTask = state[action.payload.todolistId].find(task=> task.id=== action.payload.taskId)
            if (newTask) {
                newTask.title = action.payload.title
            }
        })
        })

// (state: TasksState = initialState, action: Actions): TasksState => {
//     switch (action.type) {
//         case 'create_todolist': {
//             return { ...state, [action.payload.id]: [] }
//         }
//         case 'delete_todolist': {
//             const newState = { ...state }
//             delete newState[action.payload.id]
//             return newState
//         }
//         case 'delete_task': {
//             const filteredTasks = state[action.payload.todolistId].filter(
//                 (t) => t.id !== action.payload.taskId,
//             )
//             return { ...state, [action.payload.todolistId]: filteredTasks }
//         }
//         case 'create_task': {
//             const newTask = {
//                 id: nanoid(),
//                 title: action.payload.title,
//                 isDone: false,
//             }
//             return {
//                 ...state,
//                 [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
//             }
//         }
//         case 'changeStatus_task': {
//             const newState = state[action.payload.todolistId].map((t) =>
//                 t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
//             )
//             return { ...state, [action.payload.todolistId]: newState }
//         }
//         case 'changeTitle_task': {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
//                     t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
//                 ),
//             }
//         }
//         default:
//             return state
//     }
// }
