package com.backend.DTOs;

public record ClienteDTO(
        Long id,
        String nombre,
        String apellido,
        String email,
        String telefono
) {}
