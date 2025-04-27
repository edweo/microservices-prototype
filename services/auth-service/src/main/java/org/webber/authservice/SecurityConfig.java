package org.webber.authservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // TODO add CSRF somehow to SPA
        http.csrf(AbstractHttpConfigurer::disable);

        http.sessionManagement(s -> {
            s.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
        });

        http.authorizeHttpRequests(a -> {
            a.requestMatchers("/login").permitAll();
            a.requestMatchers("/token").permitAll();
            a.requestMatchers("/logout").permitAll();
            a.requestMatchers("/register").permitAll();
            a.anyRequest().authenticated();
        });

        return http.build();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
