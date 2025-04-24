import type { Todolist } from '../App'

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter((tl) => tl.id !== action.payload.id) // логика удаления тудулиста
        }
        default:
            return state
    }
}

export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

