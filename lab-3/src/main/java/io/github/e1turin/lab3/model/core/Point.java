package io.github.e1turin.lab3.model.core;

public record Point(double x, double y, double r) {
    public static Point of(double x, double y, double r) {
        return new Point(x, y, r);
    }
}
