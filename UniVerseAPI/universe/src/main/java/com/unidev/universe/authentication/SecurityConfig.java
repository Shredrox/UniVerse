package com.unidev.universe.authentication;

import com.unidev.universe.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;

/**
 * Configures Spring Security for a Spring Boot application.
 * Permits unauthenticated access to "/api/v1/registration/**",
 * requires authentication for other requests, and configures form-based login.
 **/

@Configuration
@EnableWebSecurity
public class SecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public SecurityConfig(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.authorizeHttpRequests(auth -> {
            try {
                auth.
                        requestMatchers("/api/v1/registration/**").permitAll()
                        .anyRequest()
                        .authenticated()
                        .and().formLogin();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }
}