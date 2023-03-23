package io.github.e1turin.repository

import io.github.e1turin.model.dao.UserEntity
import io.github.e1turin.model.dao.UserTokenEntity
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface UserTokenRepository : JpaRepository<UserTokenEntity, Long> {

//    @Query("EXISTS(SELECT FROM user_tokens WHERE user_tokens.id=:tokenId AND user_tokens.user_id=:userId)", nativeQuery = true)
    @Query("SELECT CASE WHEN count(e) > 0 THEN true ELSE false END FROM user_tokens e where e.id=:tokenId and e.user_id=:userId", nativeQuery = true)
    fun existsByIdAndUser(@Param("tokenId") id: Long, @Param("userId") userId: Long): Boolean

    @Modifying
    @Transactional
    @Query("DELETE FROM user_tokens WHERE user_tokens.id=:tokenId AND user_tokens.user_id=:userId", nativeQuery = true)
    fun deleteByIdAndUser(tokenId: Long, userId: Long)
}