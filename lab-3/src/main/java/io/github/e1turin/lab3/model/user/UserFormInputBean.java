package io.github.e1turin.lab3.model.user;

import com.google.gson.Gson;
import io.github.e1turin.lab3.model.core.data.UserAttempt;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.util.List;

@Named
@SessionScoped
public class UserFormInputBean extends UserInputBean {

    public List<UserAttempt> getAttempts() {
        return attemptRepository.getAttempts();
    }

    public String getAttemptsAsJson() {
        return new Gson().toJson(getAttempts());
    }

    public void deleteAttempts() {
        attemptRepository.clearAttempts();
    }

}
