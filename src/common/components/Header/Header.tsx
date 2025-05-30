import { NavButton } from "@/common/components/NavButton/NavButton"
import { AppBar, Toolbar, Container, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { changeThemeModeAC } from "@/app/app-reducer"
import { selectThemeMode } from "@/app/app-selectors"
import { getTheme } from "@/common/theme/theme"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { MaterialUISwitch } from "../MaterialUISwitch/MaterialUISwitch"
import { containerSx } from "@/common/styles/container.styles"

export const Header = () => {

        const dispatch = useAppDispatch()

    const themeMode = useSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    
    return (
        <div>
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <MaterialUISwitch color={'default'} onChange={changeMode} />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    )
}

