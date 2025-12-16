import { Alert, Box } from '@mui/material'

export const ErrorState = ({ message }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Alert severity="error">
        {message || 'Ocurrió un error inesperado'}
      </Alert>
    </Box>
  )
}
