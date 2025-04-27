package org.webber.flashcardsservice;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Optional;

public final class JwtUtils {

    private JwtUtils() {}

    public static String getUsername(JwtAuthenticationToken token) {
        Optional<String> username = token.getTokenAttributes()
                .entrySet()
                .stream()
                .filter(e -> e.getKey().equals("preferred_username"))
                .findFirst()
                .map(e -> (String) e.getValue());
        return username.get();
    }
}
