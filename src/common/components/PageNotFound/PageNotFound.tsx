import { Path } from '@/common/routing'
import { Button, Container } from '@mui/material'
import { Link } from 'react-router'
import styles from './PageNotFound.module.css'

export const PageNotFound = () => (
    <Container
        maxWidth={'lg'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>page not found</h2>
        <Button variant="contained" color={'primary'} component={Link} to={Path.Main}>
            To main page
        </Button>
    </Container>
)
