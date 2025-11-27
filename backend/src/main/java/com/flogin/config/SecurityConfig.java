package com.flogin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for simple REST API testing
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow auth endpoints
                // Product Endpoints
                .requestMatchers("/api/products").hasAnyRole("USER", "ADMIN") // GET /api/products (list)
                .requestMatchers("/api/products/{id}").hasAnyRole("USER", "ADMIN") // GET /api/products/{id} (detail)
                .requestMatchers(HttpMethod.POST, "/api/products").hasRole("ADMIN") // POST /api/products (create)
                .requestMatchers(HttpMethod.PUT, "/api/products/{id}").hasRole("ADMIN") // PUT /api/products/{id} (update)
                .requestMatchers(HttpMethod.DELETE, "/api/products/{id}").hasRole("ADMIN") // DELETE /api/products/{id}
                .anyRequest().authenticated()
            )
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.deny())
                .contentTypeOptions(contentTypeOptions -> {})
                .httpStrictTransportSecurity(hsts -> hsts.maxAgeInSeconds(31536000).includeSubDomains(true))
                .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'"))
            );
        
        return http.build();
    }
}
