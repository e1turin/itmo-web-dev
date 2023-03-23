package io.github.e1turin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication


fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class Application