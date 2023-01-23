package io.github.e1turin.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

//TODO: validation
data class RegisterRequest(
    @field:NotBlank
    val name: String?,
    @field:Email
    @field:NotBlank
    val email: String?,
    @field:NotBlank
    //@field:Size(min = 4, max = 20) /* message = "{validation.field.password.invalid-format} */
    val password: String?
)