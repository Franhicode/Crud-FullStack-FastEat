import { Box, Typography } from '@mui/material'
import React from 'react'

export const Home = () => {
  return (
    <>
      <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido a FastEat
      </Typography>

      <Typography variant="body1">
        Sistema de gestión de clientes y pedidos.
      </Typography>
    </Box>
    </>
  )
}
