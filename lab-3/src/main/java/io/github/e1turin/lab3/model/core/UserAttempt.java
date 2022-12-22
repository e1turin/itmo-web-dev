package io.github.e1turin.lab3.model.core;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAttempt {
    double x;
    double y;
    double r;
    boolean isInsideArea;
    long procTime;
    String currentTime;

    public static UserAttempt of(Point point, boolean isInsideArea, long procTime, String currentFormattedTime) {
        return new UserAttempt(point.x(), point.y(), point.r(), isInsideArea, procTime, currentFormattedTime);
    }
}
