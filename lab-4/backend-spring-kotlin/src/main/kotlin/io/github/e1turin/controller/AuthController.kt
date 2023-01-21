package io.github.e1turin.controller

import io.github.e1turin.dto.LoginDTO
import io.github.e1turin.dto.Message
import io.github.e1turin.dto.RegisterDTO
import io.github.e1turin.model.User
import io.github.e1turin.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api")
class AuthController(private val userService: UserService) {

    @PostMapping("register")
    fun register(@RequestBody body: RegisterDTO): ResponseEntity<User> {
        val user = User()
        user.name = body.name
        user.email = body.email
        user.password = body.password
        return ResponseEntity.ok(userService.save(user))
    }

    @PostMapping("login")
    fun login(@RequestBody body: LoginDTO): ResponseEntity<Any> {
        val user = userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(Message("User not found"))

        if (!user.comparePassword(body.password)){
            return ResponseEntity.badRequest().body(Message("Invalid password"))
        }
        return ResponseEntity.ok(user)
    }
}