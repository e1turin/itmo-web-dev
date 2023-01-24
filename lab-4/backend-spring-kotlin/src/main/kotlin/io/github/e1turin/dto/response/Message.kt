package io.github.e1turin.dto.response

data class Message(val message: String)

fun message(text: String) = Message(text)
