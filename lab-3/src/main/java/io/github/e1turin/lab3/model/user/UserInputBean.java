package io.github.e1turin.lab3.model.user;

import io.github.e1turin.lab3.model.core.PointPicker;
import io.github.e1turin.lab3.model.core.data.Point;
import io.github.e1turin.lab3.model.core.data.UserAttempt;
import io.github.e1turin.lab3.model.database.UserAttemptRepository;
import jakarta.inject.Inject;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


/* class just for don't repeat myself */
public abstract class UserInputBean implements Serializable {

    @Getter
    @Setter
    protected double xParam = 0.0;

    @Getter
    @Setter
    protected double yParam = 0.0;

    @Getter
    @Setter
    protected double rParam = 1.0;

    @Inject
    protected UserAttemptRepository attemptRepository;

    //@Inject // don't work (Jakarta hates Kotlin???)
    protected final PointPicker pointPicker = new PointPicker();

    public void addAttempt() {
        long startupTime = System.currentTimeMillis();
        Point point = Point.of(xParam, yParam, rParam);
        boolean attemptResult = pointPicker.checkPoint(point);

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy-hh:mm:ss z");
        String currentTime = dateFormat.format(date);

        long processingTime = System.currentTimeMillis() - startupTime;

        UserAttempt userAttempt = UserAttempt.of(point, attemptResult, processingTime, currentTime);
        attemptRepository.addAttempt(userAttempt);
    }

}
