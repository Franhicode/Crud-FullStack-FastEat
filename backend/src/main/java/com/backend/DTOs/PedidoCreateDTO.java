package com.backend.DTOs;

import java.time.LocalDate;

public record PedidoCreateDTO(
        LocalDate fecha,
        Double total,
        Long clienteId
) {}
