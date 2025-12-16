package com.backend.DTOs;

import java.time.LocalDate;

public record PedidoDTO(

         Long id,
         LocalDate fecha,
         Double total,
         String descripcion,

         Long clienteId,
         String nombre,
         String apellido

) {}
