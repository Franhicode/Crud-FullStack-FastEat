import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ClienteForm } from '../components/clientes/ClienteForm'
import { ClientesList } from '../components/clientes/ClientesList'
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
} from '../api/ClientesApi'

export const ClientesPage = () => {
  const [clientes, setClientes] = useState([])
  const [clienteEdit, setClienteEdit] = useState(null)

  const loadClientes = async () => {
    const res = await getClientes()
    setClientes(res.data ?? [])
  }

  useEffect(() => {
    loadClientes()
  }, [])

  const handleSubmitCliente = async (cliente) => {
    if (cliente.id) {
      await updateCliente(cliente.id, cliente)
    } else {
      await createCliente(cliente)
    }

    setClienteEdit(null)
    loadClientes()
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar cliente y sus pedidos?')) return
    await deleteCliente(id)
    loadClientes()
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>

      <ClienteForm
        onSubmitCliente={handleSubmitCliente}
        clienteEdit={clienteEdit}
      />

      <ClientesList
        clientes={clientes}
        onDelete={handleDelete}
        onEdit={setClienteEdit}
      />
    </Box>
  )
}
