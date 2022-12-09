package com.github.e1turin.lab3.model;

import com.github.e1turin.lab3.model.figure.Point;

public class PointChecker {

    public static boolean isPointInsideArea(Point point) { //TODO: migrate from servlet
        return point != null && (inSector(point)
                || inTriangle(point)
                || inRectangle(point));
    }

    private static boolean inTriangle(Point point) {
        return point.x() >= 0 && 2 * point.x() < point.r()
                && point.y() <= point.r()
                && point.y() >= 0
                && point.y() + 2 * point.x() <= point.r();
    }

    private static boolean inRectangle(Point point) {
        return point.x() <= 0 && point.x() >= -point.r()
                && point.y() <= 0 && point.y() >= -point.r();
    }

    private static boolean inSector(Point point) {
        return point.x() >= 0 && point.y() <= 0
                && 4 * point.x() * point.x() + 4 * point.y() * point.y() <= point.r() * point.r();
    }
}
