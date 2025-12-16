import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material'
import { useState } from 'react'

export const PedidoList = ({ pedidos = [], onDelete }) => {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = pedidos.filter(p =>
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <TextField
        label="Buscar pedido"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {filtrados.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.descripcion}</TableCell>
              <TableCell>{p.nombre} {p.apellido}</TableCell>
              <TableCell>${p.total}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => onDelete(p.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
