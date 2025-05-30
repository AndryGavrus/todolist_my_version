import { IconButton, TextField } from '@mui/material'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
    const [itemTitle, setItemTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle != '') {
            onCreateItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }
    return (
        <div>
            <TextField
                size="small"
                error={!!error}
                label="Enter a title"
                helperText={error}
                variant="outlined"
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <IconButton onClick={createItemHandler} color={'primary'}>
                <DataSaverOnIcon />
            </IconButton>
        </div>
    )
}
