package io.github.e1turin.controller

import com.auth0.jwt.interfaces.DecodedJWT
import io.github.e1turin.dto.inline.Jwt
import io.github.e1turin.dto.request.PointRequest
import io.github.e1turin.dto.response.errorResponse
import io.github.e1turin.model.dao.UserAttemptEntity
import io.github.e1turin.service.AuthService
import io.github.e1turin.service.MainActivityService
import io.github.e1turin.service.UserService
import io.github.e1turin.util.toPoint
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("main/points")
class MainActivityController(
    private val userService: UserService,
    private val authService: AuthService,
    private val mainActivityService: MainActivityService
) {
    private val logger = LoggerFactory.getLogger(MainActivityController::class.java)

    @PostMapping("add")
    fun addUserAttempt(
        @CookieValue("jwt") token: String?,
        @RequestBody body: PointRequest
    ): ResponseEntity<Any> {
        //TODO: Validate

        token ?: run { return ResponseEntity.badRequest().body(errorResponse("Invalid Token")) }
        val decodedJWT: DecodedJWT = authService.decodeJwt(Jwt(token)) ?: run {
            return ResponseEntity.badRequest().body(errorResponse("Invalid Token (could not decode)"))
        }
        val userId = decodedJWT.issuer.toLongOrNull() ?: run {
            return ResponseEntity.badRequest().body(errorResponse("Invalid Token (could read user)"))
        }

        val user = userService.getById(userId) ?: return ResponseEntity.internalServerError().body("NO such user (1)")

        val userAttempt = UserAttemptEntity().apply {
            x = body.x
            y = body.y
            r = body.r
            isInsideArea = mainActivityService.isPointInsideArea(body.toPoint())
            creationDateTime = Date()
            this.user = user
        }
        mainActivityService.add(userAttempt)
        return ResponseEntity.ok().body("Success")
    }

    @DeleteMapping("delete")
    fun clearUserAttempts(
        @CookieValue("jwt") token: String?
    ): ResponseEntity<Any> {

        token ?: run { return ResponseEntity.badRequest().body(errorResponse("Invalid Token")) }
        val decodedJWT: DecodedJWT = authService.decodeJwt(Jwt(token)) ?: run {
            return ResponseEntity.badRequest().body(errorResponse("Invalid Token (could not decode)"))
        }
        val userId = decodedJWT.issuer.toLongOrNull() ?: run {
            return ResponseEntity.badRequest().body(errorResponse("Invalid Token (could read user)"))
        }
//        val user = userService.getById(userId) ?: return ResponseEntity.internalServerError().body("NO such user (1)")

        logger.debug("Will remove attempts")
//        mainActivityService.deleteAllUserAttempts(user)
        mainActivityService.deleteAllUserAttempts(userId)
        return ResponseEntity.ok("Success")
    }

    @GetMapping("all")
    fun getUserAttempts(
        @CookieValue("jwt") token: String?
    ): ResponseEntity<Any> {

        token ?: run { return ResponseEntity.badRequest().body(errorResponse("Invalid Token")) }
        val decodedJWT: DecodedJWT = authService.decodeJwt(Jwt(token)) ?: run {
            return ResponseEntity.badRequest().body(errorResponse("Invalid Token (could not decode)"))
        }
        val userId = decodedJWT.issuer.toLongOrNull() ?: run {
            return ResponseEntity.badRequest().body(errorResponse("Invalid Token (could read user)"))
        }
        val user = userService.getById(userId) ?: return ResponseEntity.internalServerError().body("NO such user (1)")

        return ResponseEntity.ok(mainActivityService.getAllUserAttempts(user))
    }
}