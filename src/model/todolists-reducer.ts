import { nanoid } from '@reduxjs/toolkit'
import type { FilterValues, Todolist } from '../app/App'

const initialState: Todolist[] = []

type Actions =
    | DeleteTodolistAction
    | createTodolistAction
    | changeTodolistTitleAction
    | changeTodolistFilterAction

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter((tl) => tl.id !== action.payload.id) // логика удаления тудулиста
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all',
            }
            return [...state, newTodolist]
        }
        case 'change_todolistTitle': {
            return state.map((todolist) =>
                todolist.id === action.payload.id
                    ? { ...todolist, title: action.payload.title }
                    : todolist,
            )
        }
        case 'change_todolistFilter': {
            return state.map((todolist) =>
                todolist.id === action.payload.id
                    ? { ...todolist, filter: action.payload.filter }
                    : todolist,
            )
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {
        type: 'delete_todolist',
        payload: { id },
    } as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const createTodolistAC = (title: string) => {
    const id = nanoid()
    return {
        type: 'create_todolist',
        payload: { id, title },
    } as const
}
export type createTodolistAction = ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {
        type: 'change_todolistTitle',
        payload,
    } as const
}
export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
    return {
        type: 'change_todolistFilter',
        payload,
    } as const
}
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
