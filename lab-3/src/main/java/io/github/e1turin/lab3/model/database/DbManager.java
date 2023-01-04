package io.github.e1turin.lab3.model.database;

import io.github.e1turin.lab3.model.core.Point;
import io.github.e1turin.lab3.model.core.UserAttempt;
import jakarta.enterprise.inject.Model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Model
public class DbManager {
    private Connection conn;

    public DbManager() {
        try {
            conn = DriverManager.getConnection("jdbc:postgresql://" + System.getenv("DB_URL"), System.getenv("DB_USER"), System.getenv("DB_USER_PASSWD"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<UserAttempt> selectAllAttempts() {
        ArrayList<UserAttempt> attempts = new ArrayList<>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * from " + System.getenv("DB_TABLE_NAME"));
            while (rs.next()) {
                attempts.add(UserAttempt.of(
                        Point.of(
                                rs.getDouble(2),
                                rs.getDouble(3),
                                rs.getDouble(4)
                        ),
                        rs.getBoolean(5),
                        rs.getLong(6),
                        rs.getString(7)
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return attempts;
    }

    public void insertAttempt(UserAttempt userAttempt) {
        try {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO " + System.getenv("DB_TABLE_NAME")
                    + "(param_x, param_y, param_r, is_inside, proc_time, date_time) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setDouble(1, userAttempt.getX());
            ps.setDouble(2, userAttempt.getY());
            ps.setDouble(3, userAttempt.getR());
            ps.setBoolean(4, userAttempt.isInsideArea());
            ps.setLong(5, userAttempt.getProcTime());
            ps.setString(6, userAttempt.getCurrentTime());
            ps.execute();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void clearAttempts() {
        try {
            PreparedStatement ps = conn.prepareStatement("TRUNCATE TABLE " + System.getenv("DB_TABLE_NAME"));
            ps.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
