package com.backend.DTOs;

import java.time.LocalDate;

public record PedidoCreateDTO(
        LocalDate fecha,
        Double total,
        String descripcion,
        Long clienteId
) {}
