package com.github.e1turin.lab3.model.database;

import com.github.e1turin.lab3.model.AttemptRecord;
import com.github.e1turin.lab3.model.figure.Point;

import java.sql.*;
import java.util.ArrayList;

public class DBManager {
    private Connection conn;

    public DBManager() {
        try {
            conn = DriverManager.getConnection("jdbc:postgresql://" + System.getenv("DB_URL"), System.getenv("DB_USER"), System.getenv("DB_USER_PASSWORD"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ArrayList<AttemptRecord> getAttemptsRecords(String userSessionId) {
        ArrayList<AttemptRecord> attemptRecords = new ArrayList<>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM lab3_users_attempts" + userSessionId);
            while (rs.next()) {
                AttemptRecord attemptRecord = AttemptRecord.of(
                        Point.of(
                                rs.getDouble(2),
                                rs.getDouble(3),
                                rs.getDouble(4)
                        ),
                        rs.getBoolean(5),
                        rs.getLong(6),
                        rs.getString(7)
                );
                attemptRecords.add(attemptRecord);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return attemptRecords;
    }

    public boolean addNewAttemptRecord(AttemptRecord attemptRecord) {
        PreparedStatement ps;
        try {
            ps = conn.prepareStatement("INSERT INTO lab3_users_attempts VALUES (NULL, ?, ?, ?, ?, ?, ?)");
            ps.setDouble(1, attemptRecord.x());
            ps.setDouble(2, attemptRecord.y());
            ps.setDouble(3, attemptRecord.r());
            ps.setBoolean(4, attemptRecord.isInsideArea());
            ps.setLong(5, attemptRecord.runningTime());
            ps.setString(6, attemptRecord.currentTime());
            ps.executeQuery();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean clearTable() {
        try {
            PreparedStatement preparedStatement = conn.prepareStatement("TRUNCATE TABLE lab3");
            ResultSet resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
