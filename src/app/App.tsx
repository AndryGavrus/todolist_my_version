import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectThemeMode } from './app-selectors'
import { getTheme } from '../common/theme/theme'
import { Header } from '@/common/components/Header/Header'
import { Main } from './Main'



export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline />
                <Header />
                <Main />
            </div>
        </ThemeProvider>
    )
}
