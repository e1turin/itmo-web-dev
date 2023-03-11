package io.github.e1turin.dto.response

import io.github.e1turin.dto.User
import io.github.e1turin.dto.token.Jwt

data class AuthResponse(val user: User, val token: Jwt?)