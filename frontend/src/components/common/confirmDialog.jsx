import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

export const confirmDialog = ({ open, onClose, onConfirm, text }) => {
  return (
    <>
     <Dialog open={open} onClose={onClose}>
       <DialogTitle>Confirmar acción</DialogTitle>

       <DialogContent>
         <Typography>{text}</Typography>
       </DialogContent>

       <DialogActions>
         <Button onClick={onClose}>Cancelar</Button>
         <Button color="error" onClick={onConfirm}>
           Confirmar
         </Button>
       </DialogActions>
     </Dialog>
    </>
  )
}
