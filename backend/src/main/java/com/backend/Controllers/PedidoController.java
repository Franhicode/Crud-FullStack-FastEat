package com.backend.Controllers;

import com.backend.DTOs.ClienteCreateDTO;
import com.backend.DTOs.ClienteDTO;
import com.backend.DTOs.PedidoCreateDTO;
import com.backend.DTOs.PedidoDTO;
import com.backend.Services.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController (PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public ResponseEntity<List<PedidoDTO>> listar() {
        return ResponseEntity.ok(pedidoService.listarPedidos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> obtener(@PathVariable Long id) {
        PedidoDTO dto = pedidoService.obtenerPedido(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> crear(@RequestBody PedidoCreateDTO dto) {
        PedidoDTO creado = pedidoService.crearPedido(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }



    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> actualizar(
            @PathVariable Long id,
            @RequestBody PedidoCreateDTO dto) {
        PedidoDTO actualizado = pedidoService.actualizarPedido(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pedidoService.eliminarPedido(id);
        return ResponseEntity.noContent().build();
    }
}
