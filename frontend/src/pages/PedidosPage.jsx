import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { getPedidos, deletePedido } from '../api/PedidosApi'
import { PedidoForm } from '../components/pedidos/PedidoForm'
import { PedidoList } from '../components/pedidos/PedidoList'

export const PedidosPage = () => {
  const [pedidos, setPedidos] = useState([])

  const loadPedidos = async () => {
    const res = await getPedidos()
    setPedidos(res.data ?? [])
  }

  useEffect(() => {
    loadPedidos()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar pedido?')) return
    await deletePedido(id)
    loadPedidos()
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pedidos (Cocina)
      </Typography>

      <PedidoForm onCreated={loadPedidos} />
      <PedidoList pedidos={pedidos} onDelete={handleDelete} />
    </Box>
  )
}
