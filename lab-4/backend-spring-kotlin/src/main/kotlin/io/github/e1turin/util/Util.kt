package io.github.e1turin.util

import io.github.e1turin.dto.Point
import io.github.e1turin.dto.request.PointRequest

fun PointRequest.toPoint(): Point {
    return Point(this.x, this.y, this.r)
}