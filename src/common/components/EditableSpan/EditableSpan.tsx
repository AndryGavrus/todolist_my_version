import { TextField } from '@mui/material'
import { useState, KeyboardEvent, ChangeEvent } from 'react'

type Props = {
    value: string
    onChange: (title: string) => void
    className?: string
}
export const EditableSpan = ({ value, onChange, className }: Props) => {
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
        onChange(title)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            turnOffEditMode()
        }
    }

    return (
        <>
            {isEditMode ? (
                <TextField
                    size="small"
                    variant="standard"
                    value={title}
                    onChange={changeTitle}
                    onBlur={turnOffEditMode}
                    onKeyDown={createItemOnEnterHandler}
                    autoFocus
                />
            ) : (
                <span className={className} onDoubleClick={turnOnEditMode}>
                    {title}
                </span>
            )}
        </>
    )
}
