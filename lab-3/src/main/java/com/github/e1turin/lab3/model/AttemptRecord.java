package com.github.e1turin.lab3.model;


import com.github.e1turin.lab3.model.figure.Point;

public record AttemptRecord(double x, double y, double r, boolean isInsideArea, long runningTime, String currentTime) {
    public static AttemptRecord of(Point point, boolean isInsideArea, long runningTime, String currentFormattedTime) {
        return new AttemptRecord(point.x(), point.y(), point.r(), isInsideArea, runningTime, currentFormattedTime);
    }
}
