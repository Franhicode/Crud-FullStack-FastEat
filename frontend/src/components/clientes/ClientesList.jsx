import React, { useEffect, useState } from 'react'
import { deleteCliente, getClientes } from '../../api/ClientesApi';
import { Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ClientesList = () => {

    const [clientes, setClientes] = useState([]);

    const load = () => {
        getClientes()
         .then(res => setClientes(res.data))
         .catch(err => console.error(err)); 
    };

    useEffect(() => {
      load();
    }, []);
    
    const handleDelete = (id) => {
        if (!confirm('Estas seguro de eliminar este cliente?')) return;
        deleteCliente(id).then(() => load());
    };

  return (
    <>
     <List>
        {clientes.map(c => (
             <React.Fragment key={c.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(c.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                    <ListItemText 
                    primary={c.nombre}
                    secondary={`${c.email} · ${c.telefono}`} 
                    />
                </ListItem>
                <Divider />
             </React.Fragment>
        ))}
     </List>
    </>
  );
}
