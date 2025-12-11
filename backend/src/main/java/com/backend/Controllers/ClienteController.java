package com.backend.Controllers;

import com.backend.DTOs.ClienteCreateDTO;
import com.backend.DTOs.ClienteDTO;
import com.backend.Services.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscar(@PathVariable Long id) {
        ClienteDTO dto = service.buscar(id);
        return (dto != null) ?
                ResponseEntity.ok(dto) :
                ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ClienteDTO> crear(@RequestBody ClienteCreateDTO dto) {
        ClienteDTO creado = service.crear(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> actualizar(
            @PathVariable Long id,
            @RequestBody ClienteCreateDTO dto) {
        ClienteDTO actualizado = service.actualizar(id, dto);
        return (actualizado != null) ?
                ResponseEntity.ok(actualizado) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = service.eliminar(id);
        return eliminado ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}
