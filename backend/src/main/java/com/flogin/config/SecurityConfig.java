package com.flogin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.flogin.security.MockJwtFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MockJwtFilter mockJwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
            .csrf(AbstractHttpConfigurer::disable) // Disable CSRF
            .addFilterBefore(mockJwtFilter, UsernamePasswordAuthenticationFilter.class) // Add our Mock Filter
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Frontend URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
