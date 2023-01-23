package io.github.e1turin.dto

data class Message(val message: String)

fun message(text: String) = Message(text)
