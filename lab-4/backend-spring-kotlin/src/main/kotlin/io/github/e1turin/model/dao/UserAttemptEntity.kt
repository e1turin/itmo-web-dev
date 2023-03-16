package io.github.e1turin.model.dao

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.util.*


@Entity
@Table(name = "user_attempts")
class UserAttemptEntity {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0

    @Column(name = "x_param")
    var x: Double = 0.0

    @Column(name = "y_param")
    var y: Double = 0.0

    @Column(name = "r_param")
    var r: Double = 0.0

    @Column(name = "is_inside_area")
    var isInsideArea: Boolean = true

    @Column(name = "creation_time")
    @Temporal(TemporalType.TIMESTAMP)
    var creationDateTime: Date? = null

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: UserEntity? = null

}