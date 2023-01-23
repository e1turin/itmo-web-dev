package io.github.e1turin.controller

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTCreationException
import com.auth0.jwt.interfaces.DecodedJWT
import io.github.e1turin.dto.*
import io.github.e1turin.model.User
import io.github.e1turin.service.UserService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("api")
class AuthController(private val userService: UserService) {

    private val algorithm = Algorithm.HMAC512("secret-kek-lol-idk") //TODO setting up properly
    private val logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("register")
    fun register(@RequestBody body: RegisterRequest): ResponseEntity<Any> {
        //TODO: Validation (@Valid)

        val problems = mutableListOf<Pair<String, String>>().apply {
            body.name ?: add("name" to "Incorrect user name")
            body.email ?: add("email" to "Incorrect email")
            body.password ?: add("password" to "Incorrect Password")
        }

        if (problems.isNotEmpty()) {
            return ResponseEntity.badRequest().body(
                error("Invalid payload", problems.toMap())
            )
        }

        //TODO: check if already exists
        if (userService.existsByEmail(body.email!!)) {
            return ResponseEntity.badRequest().body(
                error("User with such email already exists")
            )
        }

        val user = User().apply {
            name = body.name!!
            email = body.email!!
            password = body.password!!
        }

        return try {
            userService.save(user)

            ResponseEntity.ok(message("Success"))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(
                error(
                    error = "An error occurred",
                    details = mapOf("error" to (e.message ?: ""))
                )
            )
        }

    }

    @PostMapping("login")
    fun login(@RequestBody body: LoginRequest, response: HttpServletResponse): ResponseEntity<Any> {
        //TODO: Validation (@Valid)

        body.email ?: return ResponseEntity.badRequest().body(error("User not found"))
        body.password ?: return ResponseEntity.badRequest().body(error("User not found"))

        val user = userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(error("User not found"))

        if (!user.comparePassword(body.password)) {
            return ResponseEntity.badRequest().body(error("Invalid password"))
        }

        val jwt = try {
            JWT.create().withIssuer(user.id.toString())
                .withExpiresAt(Date(System.currentTimeMillis() + 60 * 24 * 1000)) // 1 day
                .sign(algorithm)
        } catch (e: JWTCreationException) {
            return ResponseEntity.badRequest().body(
                error("An error occurred while preparing JWT ${e.message}")
            )
        }

        val cookie = Cookie("jwt", jwt).apply { isHttpOnly = true }

        response.addCookie(cookie)

        return ResponseEntity.ok(message("Success"))
    }

    //TODO: Is it necessary end point?
    @GetMapping("user")
    fun user(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        jwt ?: return ResponseEntity.status(401).body(error("Unauthenticated"))

        //TODO: check current user (issuer in jwt)

        return try {
            val verifier: JWTVerifier = JWT.require(algorithm).build()
            val decodedJWT: DecodedJWT = verifier.verify(jwt)

            val user = this.userService.getById(decodedJWT.issuer.toLong())

            ResponseEntity.ok(user)
        } catch (e: Exception) {
            ResponseEntity.status(401).body(
                error("Unauthenticated, an error occurred : ${e.message}")
            )
        }
    }

    @PostMapping("logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "").apply { maxAge = 0 }

        response.addCookie(cookie)

        return ResponseEntity.ok(message("Success"))
    }
}
