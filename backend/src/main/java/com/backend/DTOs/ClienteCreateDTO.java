package com.backend.DTOs;

public record ClienteCreateDTO(
        String nombre,
        String apellido,
        String email,
        String telefono
) {}

//record
// es una clase inmutable, moderna y simplificada, que java genera autom. va sin get,set ni sus constructores.
// AHORA  en vez de hacer get.nombre() / hacemos dto.nombre()

//dto x2
// cuando el cliente envia datos p/ crear o actualizar - el json del front es sin el id  xq no existe aun
// cuando el backend devuelve un cliente el json q devuelve la API es completo xq es un dto de rta

//van separadops por seguridad, si mando un dto con id ujn usuario podria pisar el valor