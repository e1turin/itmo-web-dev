package io.github.e1turin.service

import io.github.e1turin.model.dao.UserEntity
import io.github.e1turin.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun save(user: UserEntity): UserEntity {
        return userRepository.save(user)
    }

    fun findByEmail(email: String): UserEntity? {
        return try {
            userRepository.findByEmail(email)
        } catch (e: Exception) {
            null
        }
    }

    fun getById(id: Long): UserEntity? {
        return userRepository.findByIdOrNull(id)
    }

    fun existsByEmail(email: String): Boolean {
        return userRepository.existsByEmail(email)
    }
}