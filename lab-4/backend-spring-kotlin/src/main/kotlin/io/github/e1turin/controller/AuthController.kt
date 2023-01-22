package io.github.e1turin.controller

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTCreationException
import com.auth0.jwt.interfaces.DecodedJWT
import io.github.e1turin.dto.LoginDTO
import io.github.e1turin.dto.Message
import io.github.e1turin.dto.RegisterDTO
import io.github.e1turin.model.User
import io.github.e1turin.service.UserService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("api")
class AuthController(private val userService: UserService) {

    private val algorithm = Algorithm.HMAC512("secret") //TODO setting up properly

    @PostMapping("register")
    fun register(@RequestBody body: RegisterDTO): ResponseEntity<User> {
        val user = User()
        user.name = body.name
        user.email = body.email
        user.password = body.password

        //TODO: check if already exists
        return ResponseEntity.ok(userService.save(user))
    }

    @PostMapping("login")
    fun login(@RequestBody body: LoginDTO, response: HttpServletResponse): ResponseEntity<Any> {
        val user = userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(Message("user not found"))

        if (!user.comparePassword(body.password)) {
            return ResponseEntity.badRequest().body(Message("invalid password"))
        }

        val jwt = try {
            JWT.create()
                .withIssuer(user.id.toString())
                .withExpiresAt(Date(System.currentTimeMillis() + 60 * 24 * 1000)) // 1 day
                .sign(algorithm)
        } catch (e: JWTCreationException) {
            return ResponseEntity.badRequest().body(
                Message("error occurred while preparing JWT ${e.message}")
            )
        }

        val cookie = Cookie("jwt", jwt).apply { isHttpOnly = true }

        response.addCookie(cookie)

        return ResponseEntity.ok(Message("success"))
    }

    @GetMapping("user")
    fun user(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        jwt ?: return ResponseEntity.status(401).body(Message("unauthenticated"))

        //TODO: check current user (issuer in jwt)

        return try {
            val verifier: JWTVerifier = JWT.require(algorithm).build()
            val decodedJWT: DecodedJWT = verifier.verify(jwt)

            val user = this.userService.getById(decodedJWT.issuer.toLong())

            ResponseEntity.ok(user)
        } catch (e: Exception) {
            ResponseEntity.status(401).body(
                Message("unauthenticated, occurred error: ${e.message}")
            )
        }
    }

    @PostMapping("logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "").apply { maxAge = 0 }

        response.addCookie(cookie)

        return ResponseEntity.ok(Message("success"))
    }
}
