import { Grid, Paper } from '@mui/material'
import React from 'react'
import { ClienteForm } from '../components/clientes/ClienteForm';
import { ClientesList } from '../components/clientes/ClientesList';

export const ClientesPage = () => {
    return (
     <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
              <ClientesList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2 }}>
                <ClienteForm />
            </Paper>
        </Grid>
     </Grid>
     </>
    );
}
