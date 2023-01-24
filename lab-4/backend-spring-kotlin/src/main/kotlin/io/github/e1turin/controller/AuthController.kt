package io.github.e1turin.controller

import io.github.e1turin.dto.*
import io.github.e1turin.dto.inline.Jwt
import io.github.e1turin.dto.request.LoginRequest
import io.github.e1turin.dto.response.errorResponse
import io.github.e1turin.dto.response.message
import io.github.e1turin.service.AuthService
import io.github.e1turin.service.UserService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("api/auth")
class AuthController(private val userService: UserService, private val authService: AuthService) {

    private val logger = LoggerFactory.getLogger(AuthController::class.java)

    /**
     * Token check method
     */
    @PostMapping("tokens/validate")
    fun validateToken(@CookieValue("jwt") token: String?): ResponseEntity<Any> {
        //TODO @Valid
        return if (token != null && authService.validateJwt(Jwt(token))) {
            ResponseEntity.ok("Token is valid")
        } else {
            ResponseEntity.status(401).body(errorResponse("Invalid token"))
        }
    }

    /**
     * Login method
     */
    @PostMapping("tokens/create")
    fun createToken(@RequestBody body: LoginRequest, response: HttpServletResponse): ResponseEntity<Any> {

        //TODO: Validation (@Valid)
        val problems = mutableListOf<Pair<String, String>>().apply {
            body.email ?: add("email" to "Incorrect email")
            body.password ?: add("password" to "Incorrect Password")
        }

        if (problems.isNotEmpty()) {
            return ResponseEntity.badRequest().body(
                errorResponse("Invalid payload", problems.toMap())
            )
        }

        val user = userService.findByEmail(body.email!!) ?: run {
            return ResponseEntity.badRequest().body(errorResponse("User not found"))
        }

        if (!user.comparePassword(body.password!!)) {
            return ResponseEntity.badRequest().body(errorResponse("Invalid password"))
        }

        val jwt = authService.createJwtToken(user) ?: run {
            return ResponseEntity.badRequest().body(
                errorResponse("Token was not created")
            )
        }

        val cookie = Cookie("jwt", jwt.token).apply {
            isHttpOnly = true
            path = "/"
        }

        response.addCookie(cookie)

        return ResponseEntity.ok(message("Success"))
    }

    /**
     * Logout method
     */
    @DeleteMapping("tokens/delete")
    fun deleteToken(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "").apply { maxAge = 0 }

        response.addCookie(cookie)

        return ResponseEntity.ok(message("Success"))
    }


    /**
     * Returns current user data
     */
    @GetMapping("users") //TODO: Is it necessary end point?
    @CrossOrigin("localhost")
    fun user(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        jwt ?: run {
            return ResponseEntity.status(401).body(io.github.e1turin.dto.response.errorResponse("Unauthenticated"))
        }

        //TODO: check current user (issuer in jwt)

        val decodedJwt = authService.decodeJwt(Jwt(jwt)) ?: run {
            return ResponseEntity.status(401).body(
                io.github.e1turin.dto.response.errorResponse("Token was not correct")
            )
        }

        val user = this.userService.getById(decodedJwt.issuer.toLong())

        return ResponseEntity.ok(user)
    }
}
