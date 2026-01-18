import { instance } from '@/common/instance/instace'
import { Todolist } from './todolistsApi.types'
import { BaseResponse } from '@/common/types'

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', { title })
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}`)
    },
    changeTodolistTitle(todolistId: string, title: string) {
        return instance.put< BaseResponse>(`todo-lists/${todolistId}`, { title })
    },
}
