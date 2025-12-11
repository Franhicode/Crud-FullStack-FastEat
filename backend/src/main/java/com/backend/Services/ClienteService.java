package com.backend.Services;

import com.backend.DTOs.ClienteCreateDTO;
import com.backend.DTOs.ClienteDTO;
import com.backend.Entities.Cliente;
import com.backend.Repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepo;

    public ClienteService(ClienteRepository clienteRepo) {
        this.clienteRepo = clienteRepo;
    }

    public List<ClienteDTO> listar() {
        return clienteRepo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public ClienteDTO buscar(Long id) {
        return clienteRepo.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public ClienteDTO crear(ClienteCreateDTO ccdto) {
        Cliente cliente = new Cliente();
        cliente.setNombre(ccdto.nombre());
        cliente.setApellido(ccdto.apellido());
        cliente.setEmail(ccdto.email());
        cliente.setTelefono(ccdto.telefono());

        Cliente creado = clienteRepo.save(cliente);
        return toDTO(creado);
    }

    public ClienteDTO actualizar(Long id, ClienteCreateDTO ccdto) {
        return clienteRepo.findById(id)
                .map(c -> {
                    c.setNombre(ccdto.nombre());
                    c.setApellido(ccdto.apellido());
                    c.setEmail(ccdto.email());
                    c.setTelefono(ccdto.telefono());
                    return toDTO(clienteRepo.save(c));
                })
                .orElse(null);
    }

    public boolean eliminar(Long id) {
        if (!clienteRepo.existsById(id)) return false;
        clienteRepo.deleteById(id);
        return true;
    }

    private ClienteDTO toDTO(Cliente c) {
        return new ClienteDTO(c.getId(),c.getNombre(),c.getApellido(), c.getEmail(), c.getTelefono());
    }
}
