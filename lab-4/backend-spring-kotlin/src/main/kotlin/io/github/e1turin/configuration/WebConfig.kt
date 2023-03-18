package io.github.e1turin.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        //TODO: different config
        registry.addMapping("/api/**")
            .allowedOriginPatterns( "http://localhost:*" )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD") //+'OPTIONS'?
            .allowCredentials(true)
        registry.addMapping("/main/**")
            .allowedOriginPatterns( "http://localhost:*" )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
            .allowCredentials(true)
    }
}