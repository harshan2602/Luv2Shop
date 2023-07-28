package com.luv2code.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.audiences=https://gatekeeper/api/orders/**}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri=https://luv2shop.us.auth0.com/}")
    private String issuer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .requestMatchers("/api/orders/**").authenticated()
                .anyRequest().permitAll()
                .and().cors()   //Add CORS filter
                .and().oauth2ResourceServer()
                .jwt();

        //Disable CSRF since we are not using cookies for session tracking
        http.csrf().disable();


        return http.build();
    }
}
