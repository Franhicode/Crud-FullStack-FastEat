import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { AppSnackbar } from '../components/common/AppSnackbar'
import { ConfirmDialog } from '../components/common/ConfirmDialog.jsx'
import { Loading } from '../components/common/Loading'
import { ErrorState } from '../components/common/ErrorState'

import { PedidoForm } from '../components/pedidos/PedidoForm'
import { PedidoList } from '../components/pedidos/PedidoList'

import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido
} from '../api/PedidosApi'

export const PedidosPage = () => {
  /* -------------------- Data -------------------- */
  const [pedidos, setPedidos] = useState([])
  const [pedidoEdit, setPedidoEdit] = useState(null)

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
    pedidoId: null
  })

  /* -------------------- Load -------------------- */
  const loadPedidos = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await getPedidos()
      setPedidos(res.data ?? [])
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los pedidos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPedidos()
  }, [])

  /* -------------------- Create / Update -------------------- */
  const handleSubmitPedido = async (pedido) => {
    try {
      if (pedido.id) {
        await updatePedido(pedido.id, pedido)
        setSnackbar({
          open: true,
          message: 'Pedido actualizado correctamente',
          severity: 'success'
        })
      } else {
        await createPedido(pedido)
        setSnackbar({
          open: true,
          message: 'Pedido creado correctamente',
          severity: 'success'
        })
      }

      setPedidoEdit(null)
      loadPedidos()
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al guardar pedido',
        severity: 'error'
      })
    }
  }

  /* -------------------- Delete -------------------- */
  const handleDeleteRequest = (id) => {
    setConfirm({ open: true, pedidoId: id })
  }

  const handleDeleteConfirm = async () => {
    try {
      await deletePedido(confirm.pedidoId)
      setSnackbar({
        open: true,
        message: 'Pedido eliminado correctamente',
        severity: 'success'
      })
      loadPedidos()
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar pedido',
        severity: 'error'
      })
    } finally {
      setConfirm({ open: false, pedidoId: null })
    }
  }

  /* -------------------- Render -------------------- */
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pedidos (Cocina)
      </Typography>

      {/* LOADING */}
      {loading && <Loading />}

      {/* ERROR */}
      {error && <ErrorState message={error} />}

      {/* CONTENIDO OK */}
      {!loading && !error && (
        <>
          <PedidoForm
            pedidoEditando={pedidoEdit}
            onSaved={handleSubmitPedido}
          />

          <PedidoList
            pedidos={pedidos}
            onEdit={setPedidoEdit}
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
        text="¿Eliminar pedido?"
        onClose={() => setConfirm({ open: false, pedidoId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  )
}
