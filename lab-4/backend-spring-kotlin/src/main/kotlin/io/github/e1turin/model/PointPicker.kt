package io.github.e1turin.model

import io.github.e1turin.dto.Point
import org.springframework.context.annotation.Bean
import org.springframework.web.context.annotation.ApplicationScope


open class PointPicker {
    fun checkPoint(point: Point): Boolean {
        return isPointInsideArea(point)
    }


    private fun isPointInsideArea(point: Point): Boolean {
        return (inSector(point.x, point.y, point.r)
                || inTriangle(point.x, point.y, point.r)
                || inRectangle(point.x, point.y, point.r))
    }

    private fun inTriangle(x: Double, y: Double, r: Double): Boolean {
        return x >= 0 && 2 * x < r && y <= r && y >= 0 && y + 2 * x <= r
    }

    private fun inRectangle(x: Double, y: Double, r: Double): Boolean {
        return x <= 0 && x >= -r && y <= 0 && y >= -r
    }

    private fun inSector(x: Double, y: Double, r: Double): Boolean {
        return x >= 0 && y <= 0 && 4 * x * x + 4 * y * y <= r * r
    }
}
