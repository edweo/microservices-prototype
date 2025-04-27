package org.webber.authservice.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.ClientErrorException;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webber.authservice.KeycloakUtils;
import org.webber.authservice.dto.User;
import org.webber.authservice.exceptions.CustomControllerException;
import org.webber.authservice.exceptions.GeneralServerException;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final KeycloakUtils keycloakUtils;

    public LoginController(KeycloakUtils keycloakUtils) {
        this.keycloakUtils = keycloakUtils;
    }

    @PostMapping(consumes = {"application/json"})
    public ResponseEntity<String> login(@RequestBody User user, HttpServletRequest request) {
        var currentSession = request.getSession(false);
        if (currentSession != null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are already logged in");
        try {
            Keycloak client = keycloakUtils.getWebberClient(user.username(), user.password());
            AccessTokenResponse token = client.tokenManager().getAccessToken();
            token.setOtherClaims("created-at", System.currentTimeMillis() / 1000L);
            HttpSession session = request.getSession(true);
            session.setAttribute("token", keycloakUtils.convertTokenToString(token));
            session.setAttribute("user", user.username());
            return ResponseEntity.ok("Logged in successfully");
        } catch (Exception e) {
            if (e instanceof ClientErrorException err) {
                String error = err.getResponse().readEntity(ClientError.class).error_description;
                throw new CustomControllerException(HttpStatus.BAD_REQUEST, error);
            }
            throw new GeneralServerException();
        }
    }

    @GetMapping
    public ResponseEntity<String> verifyLogin(HttpServletRequest request) {
        var session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("");
        String username = (String) session.getAttribute("user");
        return ResponseEntity.ok(username);
    }

    private record ClientError(String error, String error_description) {}
}
