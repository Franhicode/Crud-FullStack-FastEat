import { Button, TextField, Box } from '@mui/material'
import { useEffect, useState } from 'react'

export const ClienteForm = ({ onSubmitCliente, clienteEdit }) => {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  })

  useEffect(() => {
    if (clienteEdit) {
      setCliente(clienteEdit)
    }
  }, [clienteEdit])

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitCliente(cliente)

    if (!clienteEdit) {
      setCliente({ nombre: '', apellido: '', email: '', telefono: '' })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, mb: 3 }}
    >
      <TextField name="nombre" label="Nombre" required onChange={handleChange} value={cliente.nombre} />
      <TextField name="apellido" label="Apellido" required onChange={handleChange} value={cliente.apellido} />
      <TextField name="email" label="Email" onChange={handleChange} value={cliente.email} />
      <TextField name="telefono" label="Teléfono" onChange={handleChange} value={cliente.telefono} />

      <Button type="submit" variant="contained">
        {clienteEdit ? 'Guardar cambios' : 'Agregar'}
      </Button>
    </Box>
  )
}
