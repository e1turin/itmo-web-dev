package io.github.e1turin.lab3.model.database;

import io.github.e1turin.lab3.model.core.data.UserAttempt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Model;
import jakarta.inject.Inject;

import java.util.List;

@Model
@ApplicationScoped
public class UserAttemptRepository {

    @Inject
    private DbManager dbManager;

    public List<UserAttempt> getAttempts() {
        return dbManager.selectAllAttempts();
    }

    public void addAttempt(UserAttempt userAttempt) {
        dbManager.insertAttempt(userAttempt);
    }

    public void clearAttempts() {
        dbManager.clearAttempts();
    }
}
