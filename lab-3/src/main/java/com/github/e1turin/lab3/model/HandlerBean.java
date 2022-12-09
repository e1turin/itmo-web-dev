package com.github.e1turin.lab3.model;

import com.github.e1turin.lab3.model.database.DBManager;
import com.github.e1turin.lab3.model.figure.Point;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.annotation.ManagedProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ManagedBean("handler")
@SessionScoped
public class HandlerBean implements Serializable {
    private DBManager dbManager = new DBManager(); //XXX: singleton?
    private List<AttemptRecord> attemptRecords = dbManager.getAttemptsRecords(null); //TODO: sessionId
    @ManagedProperty(value = "#{point}")
    private PointBean pointBean = new PointBean();

    public void addPoint() {
        long startTime = System.currentTimeMillis();
        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy-hh:mm:ss z");
        String currTime = dateFormat.format(date);
        long runningTime = System.currentTimeMillis() - startTime;
        Point point = pointBean.getPoint();
        AttemptRecord attemptRecord = AttemptRecord.of(point, checkPointInsideArea(point), runningTime, currTime);

        boolean dbAddResult = dbManager.addNewAttemptRecord(attemptRecord);
        if(dbAddResult){
            attemptRecords.add(attemptRecord);
        }
    }

    public void clearTable() {
        boolean dbClearResult = dbManager.clearTable();
        if(dbClearResult){
            attemptRecords.clear();
        }
    }

    private boolean checkPointInsideArea(Point point){
        return PointChecker.isPointInsideArea(point);
    }

}
