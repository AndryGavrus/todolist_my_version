import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import type { FilterValues, Todolist } from '../app/App'

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return { payload: { title, id: nanoid() } }
})
export const changeTodolistTitleAC = createAction<{ id: string; title: string }>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ ...action.payload, filter: 'all' })
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist?.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})

// export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//     switch (action.type) {
//         case 'delete_todolist': {
//             return state.filter((tl) => tl.id !== action.payload.id) // логика удаления тудулиста
//         }
//         case 'create_todolist': {
//             const newTodolist: Todolist = {
//                 id: action.payload.id,
//                 title: action.payload.title,
//                 filter: 'all',
//             }
//             return [...state, newTodolist]
//         }
//         case 'change_todolistTitle': {
//             return state.map((todolist) =>
//                 todolist.id === action.payload.id
//                     ? { ...todolist, title: action.payload.title }
//                     : todolist,
//             )
//         }
//         case 'change_todolistFilter': {
//             return state.map((todolist) =>
//                 todolist.id === action.payload.id
//                     ? { ...todolist, filter: action.payload.filter }
//                     : todolist,
//             )
//         }
//         default:
//             return state
//     }
// }


