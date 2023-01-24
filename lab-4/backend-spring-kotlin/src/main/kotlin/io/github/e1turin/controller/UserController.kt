package io.github.e1turin.controller

import io.github.e1turin.dto.request.RegisterRequest
import io.github.e1turin.dto.response.errorResponse
import io.github.e1turin.dto.response.message
import io.github.e1turin.model.dao.UserEntity
import io.github.e1turin.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/users")
class UserController(private val userService: UserService) {

    @PutMapping("create")
    fun registerNewUser(@RequestBody body: RegisterRequest): ResponseEntity<Any> {
        //TODO: Validation (@Valid)

        val problems = mutableListOf<Pair<String, String>>().apply {
            body.name ?: add("name" to "Incorrect user name")
            body.email ?: add("email" to "Incorrect email")
            body.password ?: add("password" to "Incorrect Password")
        }

        if (problems.isNotEmpty()) {
            return ResponseEntity.badRequest().body(
                errorResponse("Invalid payload", problems.toMap())
            )
        }

        //TODO: check if already exists
        if (userService.existsByEmail(body.email!!)) {
            return ResponseEntity.badRequest().body(
                errorResponse("User with such email already exists")
            )
        }

        val user = UserEntity().apply {
            name = body.name!!
            email = body.email!!
            password = body.password!!
        }

        return try {
            userService.save(user)
            /*
             * `201 Created` is success status response code indicates
             * that the request has succeeded and has led to the creation of a resource.
             */
            ResponseEntity.status(201).body(message("Success"))
        } catch (e: Exception) { //TODO: I really want to show user the error message?
            ResponseEntity.badRequest().body(
                errorResponse(
                    error = "An error occurred",
                    details = mapOf("error" to (e.message ?: ""))
                )
            )
        }

    }


}