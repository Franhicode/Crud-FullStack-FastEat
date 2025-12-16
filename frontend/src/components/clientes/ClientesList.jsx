import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material'
import { useState } from 'react'

export const ClientesList = ({ clientes = [], onDelete }) => {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = clientes.filter(
    c =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.apellido.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <TextField
        label="Buscar cliente"
        fullWidth
        sx={{ mb: 2 }}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {filtrados.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.nombre}</TableCell>
              <TableCell>{c.apellido}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.telefono}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => onDelete(c.id)}
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
