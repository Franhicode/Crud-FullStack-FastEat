package com.backend.DTOs;

import java.time.LocalDate;

public record PedidoDTO(
         Long id,
         LocalDate fecha,
         Double total,
         Long clienteId
) {}
