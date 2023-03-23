package io.github.e1turin.dto

@JvmInline
value class Username(val name: String)

@JvmInline
value class Email(val email: String)

data class User(
//    val name: Username,
//    val email: Email,
    val name: String,
    val email: String,
)