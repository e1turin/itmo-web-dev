package io.github.e1turin.dto

import jakarta.validation.constraints.NotBlank


//TODO: validation, Nullable?
data class LoginRequest(
    @field:NotBlank
    val email: String,
    @field:NotBlank
    //@field:Size(min = 4, max = 20)
    val password: String
)