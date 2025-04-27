package org.webber.authservice.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.webber.authservice.KeycloakUtils;
import org.webber.authservice.exceptions.GeneralServerException;

@RestController
@RequestMapping("/token")
public class TokenController {

    private final RestTemplate restTemplate;
    private final KeycloakUtils keycloakUtils;

    public TokenController(KeycloakUtils keycloakUtils, RestTemplate restTemplate) {
        this.keycloakUtils = keycloakUtils;
        this.restTemplate = restTemplate;
    }

    @GetMapping
    public ResponseEntity<String> token(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            AccessTokenResponse token = keycloakUtils.convertStringToToken((String) session.getAttribute("token"));

            long expirationTime = (token.getExpiresIn() + (long)token.getOtherClaims().get("created-at"));
            long expirationTimeRefresh = (token.getRefreshExpiresIn() + (long)token.getOtherClaims().get("created-at"));
            long currentTime = System.currentTimeMillis() / 1000L;

            // Refresh token
            if (currentTime >= expirationTime - 100 && expirationTimeRefresh - 100 >= currentTime) {
                String url = String.format("%s/realms/%s/protocol/openid-connect/token", keycloakUtils.getKEYCLOAK_URL(), keycloakUtils.getREALM());
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                String body = String.format("client_id=%s&client_secret=%s&grant_type=refresh_token&refresh_token=%s",
                        keycloakUtils.getCLIENT_ID(), keycloakUtils.getCLIENT_ID_SECRET(), token.getRefreshToken());
                HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

                try {
                    var response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, AccessTokenResponse.class);
                    AccessTokenResponse refreshedToken = response.getBody();
                    refreshedToken.setOtherClaims("created-at", System.currentTimeMillis() / 1000L);
                    session.setAttribute("token", keycloakUtils.convertTokenToString(refreshedToken));
                    return ResponseEntity.ok().body(refreshedToken.getToken());
                } catch (Exception e) {
                    throw new GeneralServerException();
                }
            }
            // User needs log in again
            else if (currentTime >= expirationTime && currentTime >= expirationTimeRefresh - 100) {
                return ResponseEntity.status(401).body("Log in again.");
            }

            return ResponseEntity.ok().body(token.getToken());
        }

        return ResponseEntity.badRequest().body("No session found");
    }
}
