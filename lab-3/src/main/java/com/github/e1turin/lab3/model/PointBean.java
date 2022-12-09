package com.github.e1turin.lab3.model;

import com.github.e1turin.lab3.model.figure.Point;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.SessionScoped;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@ManagedBean("point")
@SessionScoped
public class PointBean implements Serializable {
    private Double xCoord = null;
    private Double yCoord = null;
    private Double radius = null;

    public Point getPoint(){
        return Point.of(xCoord, yCoord, radius);
    }
}
