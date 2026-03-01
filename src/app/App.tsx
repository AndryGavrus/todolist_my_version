import { selectThemeMode } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { Routing } from '@/common/routing'
import { getTheme } from '@/common/theme'
import { initializeAppTC } from '@/features/auth/model/auth-slice'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import s from './App.module.css'
import { CircularProgress } from '@mui/material'

export const App = () => {
    const [isInitialized, setIsInitialized] = useState(false)

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    useEffect(() => {
        dispatch(initializeAppTC()).finally(() => {
            setIsInitialized(true)
        })
    }, [])

    if (!isInitialized) {
        return (
            <div className={s.circularProgressContainer}>
                <CircularProgress size={150} thickness={3} />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <CssBaseline />
                <Header />
                <Routing />
                <ErrorSnackbar />
            </div>
        </ThemeProvider>
    )
}
