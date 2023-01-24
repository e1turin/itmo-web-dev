package io.github.e1turin.dto.request

import jakarta.validation.constraints.NotNull

data class PointRequest(

    @field:NotNull
    //@field:Digits
    val x: Double,

    @field:NotNull
    val y: Double,

    @field:NotNull
    val r: Double
)