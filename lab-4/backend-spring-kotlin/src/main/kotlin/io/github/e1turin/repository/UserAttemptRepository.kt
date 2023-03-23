package io.github.e1turin.repository

import io.github.e1turin.model.dao.UserAttemptEntity
import io.github.e1turin.model.dao.UserEntity
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface UserAttemptRepository : JpaRepository<UserAttemptEntity, Long> {
    fun findAllByUser(userEntity: UserEntity): List<UserAttemptEntity>

    @Deprecated("Do not work")
    fun deleteAllByUser(user: UserEntity)
    @Modifying
    @Transactional
    @Query("delete from user_attempts where user_attempts.user_id=:userId", nativeQuery = true)
    fun deleteAllByUserId(@Param("userId") userId: Long)
}