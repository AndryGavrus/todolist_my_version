import { useState, KeyboardEvent, ChangeEvent } from "react"

type Props = {
    value: string
}
export const EditableSpan = ({ value }: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
    }

    const createItemOnEnterHandler = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            turnOffEditMode()
        }
    }


    return (
        <>
            {isEditMode ? (
                <input value={title} autoFocus onChange={changeTitle} onBlur={turnOffEditMode} onKeyDown={createItemOnEnterHandler} />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{title}</span>
            )}
        </>
    )
}

