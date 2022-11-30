package com.github.e1turin.lab3.model.figure;

public record Point(Double x, Double y, Double r) {
    public static Point of(Double x, Double y, Double r){
        return new Point(x, y, r);
    }
}
