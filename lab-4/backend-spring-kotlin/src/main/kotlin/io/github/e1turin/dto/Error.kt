package io.github.e1turin.dto


//TODO: DSL (problem with kotlin exception-Error class!!!)
data class Error(val error: String, val details: Map<String, String>? = null)

/**
 * Prepares pair for json response
 */
fun error(error: String) = Error(error)

/**
 * Prepares json object of error and it's details for json response
 */
fun error(error: String, details: Map<String, String>) = Error(error, details)


