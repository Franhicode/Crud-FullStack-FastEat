import React, { useEffect, useState } from 'react'
import { getClientes } from '../../api/ClientesApi';
import { createPedido } from '../../api/PeiddosApi';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';

export const PedidoForm = ({ onSuccess }) => {

    const [clientes, setClientes] = useState([])
    const [form, setForm] = useState({
        clienteId: '',
        fecha: '',
        total: '',
    });

    useEffect(() => {
      getClientes()
        .then((res) => setClientes(res.data));
    }, []);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPedido(form);
        onSuccess();
    }

  return (
    <>
        <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6">Nuevo Pedido</Typography>

        <TextField
            select
            label="Cliente"
            name="clienteId"
            value={form.clienteId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
        >
            {clientes.map((c) => (
            <MenuItem key={c.id} value={c.id}>
                {c.nombre}
            </MenuItem>
            ))}
        </TextField>

        <TextField
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
        />

        <TextField
            label="Total"
            name="total"
            type="number"
            value={form.total}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
        />

        <Button type="submit" variant="contained">
            Guardar
        </Button>
        </Box>
    </>
  )
}
