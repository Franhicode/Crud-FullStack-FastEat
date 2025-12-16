import React, { useEffect, useState } from 'react'
import { deletePedido, getPeiddos } from '../../api/PeiddosApi'
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { ConfirmDialog } from '../common/confirmDialog'

export const PedidoList = () => {

    const [pedidos, setPedidos] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
       loadPedidos()
    }, [])

    const loadPedidos = async () => {
        const res = await getPeiddos();
        setPedidos(res.data);
    };

    const handleDelete = async () => {
        await deletePedido(selectedId);
        setOpen(false);
        loadPedidos();
    };

  return (
    <>
       <Typography variant="h5" gutterBottom>
        Pedidos
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {pedidos.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.fecha}</TableCell>
              <TableCell>${p.total}</TableCell>
              <TableCell>{p.clienteNombre}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => {
                    setSelectedId(p.id);
                    setOpen(true);
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        text="¿Seguro que querés eliminar este pedido?"
      />
    </>
  )
}
