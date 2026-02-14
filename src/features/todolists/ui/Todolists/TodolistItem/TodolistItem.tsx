import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { useAppDispatch } from '@/common/hooks'
import { createTaskTC } from '@/features/todolists/model/tasks-slice'
import type { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import styles from './TodolistItem.module.css'

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskTC({ todolistId: todolist.id, title }))
    }

    const isDisabled = todolist.entityStatus === 'loading'

    return (
        <div className={isDisabled ? styles.disabled : ''} inert={isDisabled}>
            <TodolistTitle todolist={todolist} />
            <CreateItemForm onCreateItem={createTask} />
            <Tasks todolist={todolist} />
            <FilterButtons todolist={todolist} />
        </div>
    )
}
