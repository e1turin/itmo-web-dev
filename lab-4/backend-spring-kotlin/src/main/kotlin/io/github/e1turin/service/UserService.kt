package io.github.e1turin.service

import io.github.e1turin.model.User
import io.github.e1turin.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun save(user: User): User {
        return userRepository.save(user)
    }

    fun findByEmail(email: String): User? {
        return try {
            userRepository.findByEmail(email)
        } catch (e: Exception) {
            null
        }
    }

    fun getById(id: Long): User? {
        return userRepository.findByIdOrNull(id)
    }

    fun existsByEmail(email: String): Boolean {
        return userRepository.existsByEmail(email)
    }
}