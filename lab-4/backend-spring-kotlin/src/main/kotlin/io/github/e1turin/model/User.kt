package io.github.e1turin.model

import jakarta.persistence.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


@Entity
@Table(name = "user_account")
class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0

    @Column
    var name: String = ""

    @Column(unique = true)
    var email: String = ""

    @Column
    var password: String = ""
        get() = field
        set(value) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }

    fun comparePassword(rawPassword: String): Boolean {
        return BCryptPasswordEncoder().matches(rawPassword, this.password)
    }
}