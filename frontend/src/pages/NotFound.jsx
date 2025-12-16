import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Box
      sx={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>

      <Typography variant="h5" gutterBottom>
        Página no encontrada
      </Typography>

      <Typography sx={{ mb: 3 }}>
        La ruta a la que intentaste acceder no existe.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
      >
        Volver al inicio
      </Button>
    </Box>
  )
}
