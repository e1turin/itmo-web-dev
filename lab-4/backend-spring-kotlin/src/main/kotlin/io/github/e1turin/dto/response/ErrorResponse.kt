package io.github.e1turin.dto.response

import com.fasterxml.jackson.annotation.JsonInclude


//TODO: DSL (problem with kotlin exception-Error class!!!)
data class ErrorResponse(
    val error: String,

    @JsonInclude(JsonInclude.Include.NON_NULL)
    val details: Map<String, String>? = null
)

/**
 * Prepares pair for json response
 */
fun errorResponse(error: String) = ErrorResponse(error)

/**
 * Prepares json object of error and it's details for json response
 */
fun errorResponse(error: String, details: Map<String, String>) = ErrorResponse(error, details)


