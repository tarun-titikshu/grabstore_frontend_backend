package com.grab.cartservice;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200")  // Allow requests from Angular frontend
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowed methods
            .allowedHeaders("*")  // Allow all headers
            .allowCredentials(true);  // Allow credentials
    }
}