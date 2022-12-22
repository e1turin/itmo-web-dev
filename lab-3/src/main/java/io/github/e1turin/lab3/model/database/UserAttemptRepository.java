package io.github.e1turin.lab3.model.database;

import io.github.e1turin.lab3.model.core.UserAttempt;
import jakarta.enterprise.inject.Model;

import java.util.List;

@Model
public class UserAttemptRepository {
    private final DbManager dbManager = new DbManager();

    public List<UserAttempt> getAttempts() {
        List<UserAttempt> attempts = dbManager.selectAllAttempts();
        return attempts;
    }

    public void addAttempt(UserAttempt userAttempt) {
        dbManager.insertAttempt(userAttempt);
    }

    public void clearAttempts() {
        dbManager.clearAttempts();
    }
}
