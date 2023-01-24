package io.github.e1turin.service

import io.github.e1turin.dto.Point
import io.github.e1turin.model.PointPicker
import io.github.e1turin.model.dao.UserAttemptEntity
import io.github.e1turin.model.dao.UserEntity
import io.github.e1turin.repository.UserAttemptRepository
import io.github.e1turin.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class MainActivityService(
    private val userAttemptRepository: UserAttemptRepository,
    private val userRepository: UserRepository
) {
    private val logger = LoggerFactory.getLogger(MainActivityService::class.java)
    private val pointPicker = PointPicker()

    fun add(userAttemptEntity: UserAttemptEntity): UserAttemptEntity {
        return userAttemptRepository.save(userAttemptEntity)
    }

    fun isPointInsideArea(point: Point): Boolean {
        return pointPicker.checkPoint(point)
    }

    fun deleteAllUserAttempts(userId: Long) {
        userAttemptRepository.deleteAllByUserId(userId)
    }

    fun getAllUserAttempts(user: UserEntity): List<UserAttemptEntity> {
        return userAttemptRepository.findAllByUser(user)
    }

}