import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Stack
} from '@mui/material'
import { useState } from 'react'

export const PedidoList = ({ pedidos = [], onDelete, onEdit }) => {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = pedidos.filter(p =>
    p.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <TextField
        label="Buscar pedido"
        fullWidth
        sx={{ mb: 2 }}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtrados.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.descripcion}</TableCell>
              <TableCell>
                {p.nombre} {p.apellido}
              </TableCell>
              <TableCell>${p.total}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => onDelete(p.id)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
