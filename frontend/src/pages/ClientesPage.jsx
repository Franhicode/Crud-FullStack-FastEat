import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { AppSnackbar } from '../components/common/AppSnackbar'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { ClienteForm } from '../components/clientes/ClienteForm'
import { ClientesList } from '../components/clientes/ClientesList'
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/ClientesApi'

export const ClientesPage = () => {
  const [clientes, setClientes] = useState([])
  const [clienteEdit, setClienteEdit] = useState(null)

  /* -------------------- Snackbar -------------------- */
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  /* -------------------- Confirm Dialog -------------------- */
  const [confirm, setConfirm] = useState({
    open: false,
    clienteId: null
  })

  /* -------------------- Load -------------------- */
  const loadClientes = async () => {
    const res = await getClientes()
    setClientes(res.data ?? [])
  }

  useEffect(() => {
    loadClientes()
  }, [])

  /* -------------------- Create / Update -------------------- */
  const handleSubmitCliente = async (cliente) => {
    try {
      if (cliente.id) {
        await updateCliente(cliente.id, cliente)
        setSnackbar({
          open: true,
          message: 'Cliente actualizado correctamente',
          severity: 'success'
        })
      } else {
        await createCliente(cliente)
        setSnackbar({
          open: true,
          message: 'Cliente creado correctamente',
          severity: 'success'
        })
      }

      setClienteEdit(null)
      loadClientes()
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al guardar cliente',
        severity: 'error'
      })
    }
  }

  /* -------------------- Delete -------------------- */
  const handleDeleteRequest = (id) => {
    setConfirm({ open: true, clienteId: id })
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteCliente(confirm.clienteId)
      setSnackbar({
        open: true,
        message: 'Cliente eliminado correctamente',
        severity: 'success'
      })
      loadClientes()
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar cliente',
        severity: 'error'
      })
    } finally {
      setConfirm({ open: false, clienteId: null })
    }
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
        onEdit={setClienteEdit}
        onDelete={handleDeleteRequest}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <ConfirmDialog
        open={confirm.open}
        text="¿Eliminar cliente y todos sus pedidos?"
        onClose={() => setConfirm({ open: false, clienteId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  )
}
