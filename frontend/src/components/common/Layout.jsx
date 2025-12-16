import { AppBar, Button, Container, Toolbar, Typography, Box } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FastEat
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/clientes">
            Clientes
          </Button>
          <Button color="inherit" component={Link} to="/pedidos">
            Pedidos
          </Button>
        </Toolbar>
      </AppBar>

      {/* Spacer: evita superposición */}
      <Toolbar />

      <Box component="main">
        <Container sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  )
}
