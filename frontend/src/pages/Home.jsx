import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido a FastEat 🍔
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Sistema de gestión de clientes y pedidos.
      </Typography>

      <Grid container spacing={3}>
        {/* CLIENTES */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Clientes</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Gestión completa de clientes registrados.
              </Typography>

              <Button
                variant="contained"
                component={Link}
                to="/clientes"
              >
                Ver clientes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* PEDIDOS */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pedidos</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Administración de pedidos y órdenes.
              </Typography>

              <Button
                variant="contained"
                component={Link}
                to="/pedidos"
              >
                Ver pedidos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
