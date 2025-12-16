package com.backend.Services;

import com.backend.DTOs.PedidoCreateDTO;
import com.backend.DTOs.PedidoDTO;
import com.backend.Entities.Cliente;
import com.backend.Entities.Pedido;
import com.backend.Repositories.ClienteRepository;
import com.backend.Repositories.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepo;
    private final ClienteRepository clienteRepo;

    public PedidoService(PedidoRepository pedidoRepo, ClienteRepository clienteRepo) {
        this.pedidoRepo = pedidoRepo;
        this.clienteRepo = clienteRepo;
    }

    public List<PedidoDTO> listarPedidos() {
        return pedidoRepo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public PedidoDTO obtenerPedido(Long id) {
        Pedido pedido = pedidoRepo.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se enceuntra el pedido"));
        return toDTO(pedido);
    }

    public PedidoDTO crearPedido(PedidoCreateDTO pcdto) {
        Cliente cliente = clienteRepo.findById(pcdto.clienteId())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente no encontrado"));
        Pedido pedido = new Pedido();
        pedido.setFecha(pcdto.fecha());
        pedido.setTotal(pcdto.total());
        pedido.setDescripcion(pcdto.descripcion());
        pedido.setCliente(cliente);

        Pedido guardado = pedidoRepo.save(pedido);
        return toDTO(guardado);
    }

    public PedidoDTO actualizarPedido(Long id, PedidoCreateDTO pcdto) {
        Pedido pedido = pedidoRepo.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado"));
        //validamos q exista clienteId si lo mandan
        Cliente cliente = clienteRepo.findById(pcdto.clienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente no encontrado"));
        pedido.setFecha(pcdto.fecha());
        pedido.setTotal(pcdto.total());
        pedido.setDescripcion(pcdto.descripcion());
        pedido.setCliente(cliente);

        Pedido actualizado = pedidoRepo.save(pedido);
        return toDTO(actualizado);
    }

    public void eliminarPedido(Long id) {
        if (!pedidoRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado");
        }
        pedidoRepo.deleteById(id);
    }

    // --- mapping helpers --- metodo priv q ayuda a convertir objeto

    private PedidoDTO toDTO(Pedido pedido) {
        return new PedidoDTO(
                pedido.getId(),
                pedido.getFecha(),
                pedido.getTotal(),
                pedido.getDescripcion(),
                pedido.getCliente().getId(),
                pedido.getCliente().getNombre(),
                pedido.getCliente().getApellido()
        );
    }
}
