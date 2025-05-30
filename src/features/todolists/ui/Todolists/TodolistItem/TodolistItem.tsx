import { CreateItemForm } from '../../../../../common/components/CreateItemForm/CreateItemForm'
import { Todolist } from '../../../model/todolists-reducer'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { createTaskAC } from '@/features/todolists/model/tasks-reducer'

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({ todolistId: todolist.id, title }))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <CreateItemForm onCreateItem={createTask} />
            <Tasks todolist={todolist} />
            <FilterButtons todolist={todolist} />
        </div>
    )
}
