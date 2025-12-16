import {Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { useState } from 'react'

export const PedidosTable = ({ pedidos = [] }) => {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = pedidos.filter(p =>
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  )
  return (
    <>
     <TextField
        label="Buscar pedido o cliente"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtrados.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.descripcion}</TableCell>
              <TableCell>{p.nombre} {p.apellido}</TableCell>
              <TableCell>{p.fecha}</TableCell>
              <TableCell>${p.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
