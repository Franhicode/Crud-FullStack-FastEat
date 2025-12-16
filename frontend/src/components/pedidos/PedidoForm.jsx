import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { getClientes } from '../../api/ClientesApi'

export const PedidoForm = ({ pedidoEdit, onSubmitPedido }) => {
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
    if (pedidoEdit) {
      setPedido({
        descripcion: pedidoEdit.descripcion ?? '',
        total: pedidoEdit.total ?? '',
        fecha: pedidoEdit.fecha ?? '',
        clienteId: pedidoEdit.clienteId ?? ''
      })
    }
  }, [pedidoEdit])

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitPedido({ ...pedido, id: pedidoEdit?.id })

    setPedido({
      descripcion: '',
      total: '',
      fecha: '',
      clienteId: ''
    })
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
        {pedidoEdit ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  )
}
