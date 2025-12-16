import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { AppSnackbar } from '../components/common/AppSnackbar'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { Loading } from '../components/common/Loading'
import { ErrorState } from '../components/common/ErrorState'

import { ClienteForm } from '../components/clientes/ClienteForm'
import { ClientesList } from '../components/clientes/ClientesList'

import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
} from '../api/ClientesApi'

export const ClientesPage = () => {
  /* -------------------- Data -------------------- */
  const [clientes, setClientes] = useState([])
  const [clienteEdit, setClienteEdit] = useState(null)

  /* -------------------- States UI -------------------- */
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    try {
      setLoading(true)
      setError(null)

      const res = await getClientes()
      setClientes(res.data ?? [])
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los clientes')
    } finally {
      setLoading(false)
    }
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

      {/* LOADING */}
      {loading && <Loading />}

      {/* ERROR */}
      {error && <ErrorState message={error} />}

      {/* CONTENIDO OK */}
      {!loading && !error && (
        <>
          <ClienteForm
            onSubmitCliente={handleSubmitCliente}
            clienteEdit={clienteEdit}
          />

          <ClientesList
            clientes={clientes}
            onEdit={setClienteEdit}
            onDelete={handleDeleteRequest}
          />
        </>
      )}

      {/* SNACKBAR */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      {/* CONFIRM */}
      <ConfirmDialog
        open={confirm.open}
        text="¿Eliminar cliente y todos sus pedidos?"
        onClose={() => setConfirm({ open: false, clienteId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  )
}
