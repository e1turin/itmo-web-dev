package io.github.e1turin.dto

import com.fasterxml.jackson.annotation.JsonInclude


//TODO: DSL (problem with kotlin exception-Error class!!!)
data class Error(
    val error: String,

    @JsonInclude(JsonInclude.Include.NON_NULL)
    val details: Map<String, String>? = null
)

/**
 * Prepares pair for json response
 */
fun error(error: String) = Error(error)

/**
 * Prepares json object of error and it's details for json response
 */
fun error(error: String, details: Map<String, String>) = Error(error, details)


