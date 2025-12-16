import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { createPedido, updatePedido } from '../../api/PedidosApi'
import { getClientes } from '../../api/ClientesApi'

export const PedidoForm = ({ pedidoEditando, onSaved }) => {
  const [pedido, setPedido] = useState({
    descripcion: '',
    total: '',
    fecha: '',
    clienteId: ''
  })

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    getClientes().then(res => setClientes(res.data ?? []))
  }, [])

  useEffect(() => {
    if (pedidoEditando) {
      setPedido({
        descripcion: pedidoEditando.descripcion ?? '',
        total: pedidoEditando.total ?? '',
        fecha: pedidoEditando.fecha ?? '',
        clienteId: pedidoEditando.clienteId
      })
    }
  }, [pedidoEditando])

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (pedidoEditando) {
      await updatePedido(pedidoEditando.id, pedido)
    } else {
      await createPedido(pedido)
    }

    setPedido({
      descripcion: '',
      total: '',
      fecha: '',
      clienteId: ''
    })

    onSaved()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, mb: 3 }}
    >
      <TextField
        label="Descripción"
        name="descripcion"
        value={pedido.descripcion}
        onChange={handleChange}
        required
      />

      <TextField
        label="Total"
        name="total"
        type="number"
        value={pedido.total}
        onChange={handleChange}
        required
      />

      <TextField
        type="date"
        name="fecha"
        value={pedido.fecha}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        select
        label="Cliente"
        name="clienteId"
        value={pedido.clienteId}
        onChange={handleChange}
        required
      >
        {clientes.map(c => (
          <MenuItem key={c.id} value={c.id}>
            {c.nombre} {c.apellido}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained">
        {pedidoEditando ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  )
}
