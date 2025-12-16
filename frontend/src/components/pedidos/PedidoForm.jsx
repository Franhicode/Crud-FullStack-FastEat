import { useEffect, useState } from 'react'
import { Box, Button, MenuItem, TextField } from '@mui/material'
import { getClientes } from '../../api/clientesApi'
import { createPedido } from '../../api/pedidosApi'

export const PedidoForm = ({ onCreated }) => {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState({
    clienteId: '',
    descripcion: '',
    total: ''
  })

  useEffect(() => {
    getClientes().then(res => setClientes(res.data ?? []))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPedido({
      ...form,
      fecha: new Date().toISOString().split('T')[0]
    })
    setForm({ clienteId: '', descripcion: '', total: '' })
    onCreated?.()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        select
        label="Cliente"
        name="clienteId"
        fullWidth
        required
        value={form.clienteId}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        {clientes.map(c => (
          <MenuItem key={c.id} value={c.id}>
            {c.nombre} {c.apellido}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Pedido"
        name="descripcion"
        fullWidth
        required
        value={form.descripcion}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Total"
        name="total"
        type="number"
        fullWidth
        required
        value={form.total}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained">
        Crear Pedido
      </Button>
    </Box>
  )
}
