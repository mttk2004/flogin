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
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS (Cross-Origin Resource Sharing) for frontend communication
            .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for stateless REST APIs using JWT
            .addFilterBefore(mockJwtFilter, UsernamePasswordAuthenticationFilter.class) // Add our Mock Filter for JWT
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow unauthenticated access to authentication endpoints
                // Product Endpoints
                .requestMatchers("/api/products").hasAnyRole("USER", "ADMIN") // GET /api/products (list) requires USER or ADMIN role
                .requestMatchers("/api/products/{id}").hasAnyRole("USER", "ADMIN") // GET /api/products/{id} (detail) requires USER or ADMIN role
                .requestMatchers(HttpMethod.POST, "/api/products").hasRole("ADMIN") // POST /api/products (create) requires ADMIN role
                .requestMatchers(HttpMethod.PUT, "/api/products/{id}").hasRole("ADMIN") // PUT /api/products/{id} (update) requires ADMIN role
                .requestMatchers(HttpMethod.DELETE, "/api/products/{id}").hasRole("ADMIN") // DELETE /api/products/{id} requires ADMIN role
                .anyRequest().authenticated() // All other requests require authentication
            )
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.deny()) // X-Frame-Options: DENY - Prevents clickjacking by disallowing embedding in iframes
                .contentTypeOptions(contentTypeOptions -> {}) // X-Content-Type-Options: nosniff - Prevents browsers from MIME-sniffing a response away from the declared Content-Type
                .httpStrictTransportSecurity(hsts -> hsts.maxAgeInSeconds(31536000).includeSubDomains(true)) // HSTS - Forces clients to use HTTPS for a year, preventing downgrade attacks
                .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'")) // CSP - Restricts sources for various content types to 'self' to mitigate XSS attacks
            );
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Allow requests from the frontend origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow common HTTP methods
        configuration.setAllowedHeaders(Arrays.asList("*")); // Allow all headers
        configuration.setAllowCredentials(true); // Allow sending of cookies/auth headers with cross-origin requests
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply this CORS configuration to all paths
        return source;
    }
}
