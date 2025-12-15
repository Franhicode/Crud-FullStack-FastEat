import React from 'react'
import { useForm } from 'react-hook-form'
import { createCliente } from '../../api/ClientesApi';
import { Box, Button, TextField } from '@mui/material';

export const ClienteForm = () => {

    const { register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        createCliente(data)
          .then(() => {
            alert('Cliente creado con exito');
            reset();
            //AGREGAR evento para recargar lista 
          })
          .catch(err => {
            console.error(err);
            alert('Error al crear el cliente');
          });
    };

  return (
    <>
     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
       <TextField label="Nombre" {...register('nombre')} required />
       <TextField label="Apellido" {...register('apellido')} required />
       <TextField label="Email" {...register('email')} type="email" required />
       <TextField label="Teléfono" {...register('telefono')} required />
       <Button variant="contained" type="submit">Crear Cliente</Button>
     </Box>
    </>
  )
}
