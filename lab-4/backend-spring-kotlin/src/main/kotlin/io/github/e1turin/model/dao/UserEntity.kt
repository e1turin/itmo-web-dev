package io.github.e1turin.model.dao

import jakarta.persistence.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


@Entity
@Table(name = "user_account")
class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0

    @Column
    var name: String = ""

    @Column(unique = true)
    var email: String = ""

    @Column
    var password: String = ""
        set(value) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }

    @OneToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY, mappedBy = "user")
    var attempts: List<UserAttemptEntity> = mutableListOf()
        get() = attempts.toList()

    @OneToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY, mappedBy = "user")
    var tokens: List<UserTokenEntity> = mutableListOf()
        get() = tokens.toList()

    fun comparePassword(rawPassword: String): Boolean {
        return BCryptPasswordEncoder().matches(rawPassword, this.password)
    }
}