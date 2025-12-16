import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { ClienteForm } from '../components/clientes/ClienteForm'
import { ClientesList } from '../components/clientes/ClientesList'
import { getClientes, createCliente, deleteCliente } from '../api/clientesApi'

export const ClientesPage = () => {
  const [clientes, setClientes] = useState([])

  const cargarClientes = () => {
    getClientes().then(res => setClientes(res.data))
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  const handleCrear = (cliente) => {
    createCliente(cliente).then(cargarClientes)
  }

  const handleDelete = (id) => {
    deleteCliente(id).then(cargarClientes)
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>

      <ClienteForm onClienteCreado={handleCrear} />

      <ClientesList
        clientes={clientes}
        onDelete={handleDelete}
      />
    </>
  )
}
