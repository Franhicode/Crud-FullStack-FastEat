import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { PedidosPage } from './pages/PedidosPage'
import { ClientesPage } from './pages/ClientesPage'

export const App = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>FastEat</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/clientes">Clientes</Button>
          <Button color="inherit" component={Link} to="/pedidos">Pedidos</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='clientes' element={<ClientesPage/>}/>
          <Route path='pedidos' element={<PedidosPage/>}/>
        </Routes>
      </Container>
    </>
  )
}
