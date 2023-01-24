package io.github.e1turin.service

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import io.github.e1turin.dto.inline.Jwt
import io.github.e1turin.model.dao.UserEntity
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthService {
    private val logger = LoggerFactory.getLogger(AuthService::class.java)

    //Injected
    private val algorithm = Algorithm.HMAC512("secret-kek-lol-idk") //TODO setting up properly
    fun createJwtToken(user: UserEntity): Jwt? =
        try {
            Jwt(
                JWT.create().withIssuer(user.id.toString())
                    .withExpiresAt(Date(System.currentTimeMillis() + 60 * 24 * 1000)) // 1 day
                    .sign(algorithm)
            )
        } catch (e: Exception) {
            logger.error(e.message, e.cause)
            null
        }


    fun decodeJwt(token: Jwt): DecodedJWT? =
        try {
            val verifier: JWTVerifier = JWT.require(algorithm).build()
            verifier.verify(token.token)
        } catch (e: Exception) {
            logger.error(e.message, e.cause)
            null
        }

    fun validateJwt(token: Jwt): Boolean {
        return decodeJwt(token) != null
    }

}