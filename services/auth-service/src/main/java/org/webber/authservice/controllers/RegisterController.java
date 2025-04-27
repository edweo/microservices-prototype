package org.webber.authservice.controllers;

import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webber.authservice.KeycloakUtils;
import org.webber.authservice.dto.User;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final KeycloakUtils keycloakUtils;

    public RegisterController(KeycloakUtils keycloakUtils) {
        this.keycloakUtils = keycloakUtils;
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestBody User user) {
        Keycloak adminClient = keycloakUtils.getWebberAdminClient();
        RealmResource realm = adminClient.realm(keycloakUtils.getREALM());
        UserRepresentation newUser = new UserRepresentation();
        newUser.setEnabled(true);
        newUser.setUsername(user.username());

        try(var resp = realm.users().create(newUser)) {
            int status = resp.getStatus();
            switch (status) {
                case 201:
                    updatePassword(realm, resp, user.password());
                    return ResponseEntity.status(201).body("User registered successfully");
                case 409:
                    // TODO User already exists, throw error
                    return ResponseEntity.status(409).body("User already exists");
                default:
                    return ResponseEntity.status(500).body("Something went wrong");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Something went wrong");
        }
    }

    private void updatePassword(RealmResource realm, Response resp, String password) {
        String userId = resp.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        var credential = new CredentialRepresentation();
        credential.setType(OAuth2Constants.PASSWORD);
        credential.setValue(password);
        credential.setId(userId);
        realm.users().get(userId).resetPassword(credential);
    }
}
