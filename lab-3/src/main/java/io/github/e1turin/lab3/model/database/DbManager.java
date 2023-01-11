package io.github.e1turin.lab3.model.database;

import io.github.e1turin.lab3.model.core.data.Point;
import io.github.e1turin.lab3.model.core.data.UserAttempt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Model
@ApplicationScoped
public class DbManager {
    private final Connection conn;

    private final String dbUrl = System.getenv("DB_URL");
    private final String dbUserName = System.getenv("DB_USER");
    private final String dbUserPasswd = System.getenv("DB_USER_PASSWD");
    private final String dbTableName = System.getenv("DB_TABLE_NAME");

    public DbManager() {
        try {
            conn = DriverManager.getConnection("jdbc:postgresql://" + dbUrl, dbUserName, dbUserPasswd);
        } catch (SQLException e) {
            System.out.println("~~~ Problem with JDBC connection!!! ~~~");
            System.out.println(e.getMessage());
            e.printStackTrace();

            throw new RuntimeException(e.getCause());
        }
    }

    public List<UserAttempt> selectAllAttempts() {
        ArrayList<UserAttempt> attempts = new ArrayList<>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * from " + dbTableName);
            while (rs.next()) {
                attempts.add(
                        UserAttempt.of(
                                Point.of(
                                        rs.getDouble(2),
                                        rs.getDouble(3),
                                        rs.getDouble(4)
                                ),
                                rs.getBoolean(5),
                                rs.getLong(6),
                                rs.getString(7)
                        )
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return attempts;
    }

    public void insertAttempt(UserAttempt userAttempt) {
        try {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO " + dbTableName
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
            PreparedStatement ps = conn.prepareStatement("TRUNCATE TABLE " + dbTableName);
            ps.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
