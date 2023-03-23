package io.github.e1turin.model.dao

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name= "user_tokens")
class UserTokenEntity {
    @Id
    var id: Long = 0

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: UserEntity? = null

}