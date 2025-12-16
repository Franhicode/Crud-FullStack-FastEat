import { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'
import { getPedidos } from '../api/PedidosApi'
import { PedidosTable } from '../components/pedidos/PedidosTable'

export const Home = () => {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    getPedidos()
      .then(res => setPedidos(res.data ?? []))
      .catch(err => console.error(err))
  }, [])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orden de pedidos en tiempo real
      </Typography>

      <PedidosTable pedidos={pedidos} />
    </Box>
  )
}
